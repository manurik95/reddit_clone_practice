
import { redirect } from 'next/navigation'

export const metadata= {
    title: "Settings",
    description: "Manage account and Website settings"

}


import UserNameForm from '@/components/UserNameForm';
import { authOptions, getAuthSession } from '@/lib/auth';


const page = async ({}) => {
    const session = await getAuthSession()

    if (!session?.user) {
        redirect(authOptions?.pages?.signIn || '/login')
      }

 
    return (
        <div className='max-w-4 mx-auto py-12'>
            <div className='grid items-start gap-8'>
                <h1 className='font-bold text-3x1 md:text-4xl'>
                    Settings
                </h1>
            </div>

            <div className='grid gap-10'>
                <UserNameForm user={{
                    id: session.user.id,
                    username: session.user.username || ""
                }} />
            </div>

        </div>
  );
}

export default page;