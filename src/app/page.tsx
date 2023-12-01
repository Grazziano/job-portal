import axios from 'axios';
import { cookies } from 'next/headers';

export async function getUser() {
  try {
    const token = cookies().get('token');

    const response = await axios.get(
      'http://localhost:3000/api/users/currentuser',
      {
        headers: {
          Cookie: `token=${token?.value}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
}

export default async function Home() {
  const user: any = await getUser();

  return (
    <main>
      <h1>Job Portal</h1>

      <h1>Current User: {user && user.name}</h1>
    </main>
  );
}
