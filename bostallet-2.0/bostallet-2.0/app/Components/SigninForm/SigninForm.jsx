// "use client";
// import React, { useActionState } from 'react'
// import { signIn } from '../../actions/actions';

// const SigninForm = () => {
//     const message = false
//     const [state, action, pending] = useActionState(signIn)
//   return (
//   <div className="p-5 max-w-[700px] m-auto">
//       <form action={action} className="flex flex-col justify-around gap-4 pt-20">
//         <input
//           className="px-10 py-4"
//           placeholder="e-post"
//           type="email"
//           name="email"
//           required
//         />
//         {/* {state?.errors?.name && <p>{state.errors.email}</p>} */}
//         <input
//           className="px-10 py-4"
//           placeholder="lösenord"
//           type="password"
//           name="password"
//           required
//         />
//         {/* {state?.errors?.name && <p>{state.errors.password}</p>} */}
//         <button
//         disabled={pending}
//         type='submit'
//         className="transition duration-500 ease-out text-font font-bold gradiantBg py-4 px-10 rounded-md hover:scale-105"
//         >
//          {pending ? "Loggar in..." : "Verifiera dig"}
//         </button>
//         {message && <p className="mt-4 text-center">{message}</p>}
//       </form>
//     </div>  )
// }

// export default SigninForm