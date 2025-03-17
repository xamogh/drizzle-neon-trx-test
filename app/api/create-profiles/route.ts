import { db, UsersTable } from '@/lib/drizzle';
import { NextResponse } from 'next/server';

console.log("main")

// Function to generate random names
function generateRandomName() {
  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah',
    'Thomas', 'Karen', 'Charles', 'Nancy', 'Christopher', 'Lisa', 'Daniel', 'Margaret'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}

export async function POST() {
  try {
    // Generate unique random profiles
    const timestamp = Date.now();
    
    // Create profiles with random names
    const name1 = generateRandomName();
    const name2 = generateRandomName();
    
    // Generate random avatar IDs
    const avatarId1 = Math.floor(Math.random() * 100);
    const avatarId2 = Math.floor(Math.random() * 100);
    
    const profiles = [
      {
        name: name1,
        email: `user1.${timestamp}@example.com`,
        image: `https://avatar.iran.liara.run/public/${avatarId1}`,
      },
      {
        name: name2,
        email: `user2.${timestamp}@example.com`,
        image: `https://avatar.iran.liara.run/public/${avatarId2}`,
      },
    ];

    // Use Drizzle transaction
    await db.transaction(async (tx) => {
      for (const profile of profiles) {
        await tx.insert(UsersTable).values(profile);
      }
    });

    return NextResponse.json({ success: true, count: profiles.length, profiles });
  } catch (error) {
    console.error('Error creating profiles:', error);
    return NextResponse.json(
      { error: 'Failed to create profiles' },
      { status: 500 }
    );
  }
} 