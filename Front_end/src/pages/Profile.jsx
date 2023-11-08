import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <>
     <div className='flex justify-center items-center mx-auto min-h-[80vh] drop-shadow'>
      <div className="flex flex-col justify-center w-auto py-4 shadow-lg rounded-xl bg-base-200 border">
        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          className="object-cover w-32 h-32 mx-auto rounded-full aspect-square" />
        <div className="space-y-4 text-center">
          <div className="my-2 space-y-1 ">
            <h2 className="text-xl font-semibold ">{user.username}</h2>
            <h4 className="text-lg ">{user.email}</h4>
            <div className='flex justify-center items-center '>
              <p className="px-1 font-semibold ">Roles:  </p>
              <p>{user.roles}</p>
            </div>
          </div>
          <div className="border-t-2 border-base-300 ">
            <p className='mt-4 px-5'>
              Token: {user.accessToken.substring(0, 20)}...
              {user.accessToken.substring(user.accessToken.length - 20)}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default Profile