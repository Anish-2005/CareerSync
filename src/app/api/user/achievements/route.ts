import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

// Get user achievements
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user = await User.findOne({ firebaseUid: decodedToken.uid })

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || '',
        achievements: [],
        stats: {
          totalApplications: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
      })
    }

    return NextResponse.json({
      success: true,
      achievements: user.achievements || [],
      stats: user.stats || {
        totalApplications: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Unlock achievement
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { achievementId } = await request.json()

    if (!achievementId) {
      return NextResponse.json({ error: 'Achievement ID required' }, { status: 400 })
    }

    let user = await User.findOne({ firebaseUid: decodedToken.uid })

    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || '',
        achievements: [],
        stats: {
          totalApplications: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
      })
    }

    // Check if achievement already unlocked
    const alreadyUnlocked = user.achievements?.some((a: any) => a.id === achievementId)

    if (!alreadyUnlocked) {
      if (!user.achievements) {
        user.achievements = []
      }
      
      user.achievements.push({
        id: achievementId,
        unlockedAt: new Date(),
      })

      await user.save()

      return NextResponse.json({
        success: true,
        message: 'Achievement unlocked!',
        achievement: { id: achievementId, unlockedAt: new Date() },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Achievement already unlocked',
    })
  } catch (error) {
    console.error('Error unlocking achievement:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update user stats
export async function PUT(request: NextRequest) {
  try {
    await dbConnect()

    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { stats } = await request.json()

    let user = await User.findOne({ firebaseUid: decodedToken.uid })

    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || '',
        achievements: [],
        stats: {
          totalApplications: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
      })
    }

    // Update stats
    if (stats) {
      user.stats = {
        ...user.stats,
        ...stats,
      }
      
      // Update longest streak if current streak is higher
      if (stats.currentStreak && stats.currentStreak > (user.stats?.longestStreak || 0)) {
        user.stats.longestStreak = stats.currentStreak
      }

      await user.save()
    }

    return NextResponse.json({
      success: true,
      stats: user.stats,
    })
  } catch (error) {
    console.error('Error updating stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
