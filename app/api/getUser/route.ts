// File: app/api/getUser/route.ts
import { NextResponse } from 'next/server';

interface User {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

interface DepartmentData {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
  minAge?: number;
  maxAge?: number;
}

interface DepartmentMap {
  [department: string]: DepartmentData;
}

export async function GET(_request: Request) {
  try {
    const res = await fetch('https://dummyjson.com/users');
    const { users }: { users: User[] } = await res.json();

    const departmentMap: DepartmentMap = {};

    for (const user of users) {
      const dept = user.company.department;
      const fullName = user.firstName + user.lastName;

      if (!departmentMap[dept]) {
        departmentMap[dept] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };
      }

      const deptData = departmentMap[dept];

      // Count gender
      deptData[user.gender]++;

      // Count hair color
      const color = user.hair.color;
      deptData.hair[color] = (deptData.hair[color] || 0) + 1;

      // Collect address
      deptData.addressUser[fullName] = user.address.postalCode;

      // Track min/max age 
      const age = user.age;
      deptData.minAge = deptData.minAge !== undefined ? Math.min(deptData.minAge, age) : age;
      deptData.maxAge = deptData.maxAge !== undefined ? Math.max(deptData.maxAge, age) : age;
    }

    // Assign ageRange and clear temp minAge/maxAge
    for (const dept in departmentMap) {
      const d = departmentMap[dept];
      d.ageRange = `${d.minAge}-${d.maxAge}`;
      delete d.minAge;
      delete d.maxAge;
    }

    return NextResponse.json(departmentMap);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
