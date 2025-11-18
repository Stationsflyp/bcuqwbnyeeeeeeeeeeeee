import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const sql = neon(process.env.POSTGRES_URL!);

export async function GET(request: NextRequest) {
  try {
    // Get total visits
    const result = await sql('SELECT total_visits FROM visitor_stats ORDER BY id DESC LIMIT 1');
    const totalVisits = result[0]?.total_visits || 0;
    
    // Get online count (users who visited in last 5 minutes)
    const onlineResult = await sql(`
      SELECT COUNT(*) as online_count 
      FROM visitor_sessions 
      WHERE last_seen > NOW() - INTERVAL '5 minutes'
    `);
    
    const currentOnline = onlineResult[0]?.online_count || 0;
    
    return NextResponse.json({
      totalVisits,
      currentOnline,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { totalVisits: 0, currentOnline: 0, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for session tracking
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Hash the IP to maintain some privacy
    const ipHash = crypto
      .createHash('sha256')
      .update(ip + process.env.POSTGRES_URL!)
      .digest('hex');
    
    // Check if this is a new visitor (not visited in last 30 minutes)
    const existingSession = await sql(
      `SELECT id, last_seen FROM visitor_sessions WHERE ip_hash = $1`,
      [ipHash]
    );
    
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
    
    let isNewVisit = false;
    
    if (existingSession.length === 0) {
      // New visitor - create session and increment counter
      await sql(
        `INSERT INTO visitor_sessions (ip_hash, last_seen) VALUES ($1, $2)`,
        [ipHash, now]
      );
      isNewVisit = true;
    } else if (new Date(existingSession[0].last_seen) < thirtyMinutesAgo) {
      // Returning visitor after 30 minutes - increment counter
      await sql(
        `UPDATE visitor_sessions SET last_seen = $1 WHERE ip_hash = $2`,
        [now, ipHash]
      );
      isNewVisit = true;
    } else {
      // Recent visitor - just update last seen
      await sql(
        `UPDATE visitor_sessions SET last_seen = $1 WHERE ip_hash = $2`,
        [now, ipHash]
      );
    }
    
    // If new visit, increment total counter
    if (isNewVisit) {
      await sql(`
        UPDATE visitor_stats 
        SET total_visits = total_visits + 1, last_updated = NOW()
        WHERE id = (SELECT id FROM visitor_stats ORDER BY id DESC LIMIT 1)
      `);
    }
    
    // Get updated stats
    const statsResult = await sql('SELECT total_visits FROM visitor_stats ORDER BY id DESC LIMIT 1');
    const totalVisits = statsResult[0]?.total_visits || 0;
    
    const onlineResult = await sql(`
      SELECT COUNT(*) as online_count 
      FROM visitor_sessions 
      WHERE last_seen > NOW() - INTERVAL '5 minutes'
    `);
    const currentOnline = onlineResult[0]?.online_count || 0;
    
    return NextResponse.json({
      totalVisits,
      currentOnline,
      isNewVisit,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error recording visitor:', error);
    return NextResponse.json(
      { error: 'Failed to record visit' },
      { status: 500 }
    );
  }
}
