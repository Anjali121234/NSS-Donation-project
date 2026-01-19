// import NextAuth, { NextAuthOptions }  from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import connectDB from "@/lib/db";
// import User from "@/models/User"


// export const authOptions: NextAuthOptions= {
//     providers:[
//         CredentialsProvider({
//             name:"Credentials",
//             credentials:{
//                 email:{label:"Email",type:"email"},
//                 password:{label:"Password",type:"password"},
//             },

//             async authorize(credentials){
//                 const cred=credentials as {email:string;password:string};
//                  console.log("Authorize called with:", cred);

//                 if(!cred.email||!cred.password){
//                     throw new Error("missing credentials")
//                 }
               
                
//             await connectDB();

//             const user= await User.findOne({email:cred.email});
//              console.log("User from DB:", user);

//                 if(!user){
//                     throw new Error("User not found");
//                 }

//             const isValid= await bcrypt.compare(
//                 cred.password,
//                 user.password
//             );
//              console.log("Password valid?", isValid);


//             if(!isValid){
//                 throw new Error("incorrect password")
//             }
           
//             return {
//                 id:user._id.toString(),
//                 name:user.name,
//                 email:user.email,
//                 role:user.role,
//             }
//             }
//         })
//     ],
//     session:{
//         strategy:"jwt",
//     },

//     callbacks:{
//         async jwt({token,user}){
//             if(user){
//                 token.role=(user as any).role;
//                 token.id=(user as any).id;
//             }
//             return token;
//         },
//         async session({session,token}){
//              if (session.user) {
//        (session.user as any).id = token.id as string;
//         (session.user as any).role = token.role as string;
//       }
//       return session;
//         },
//     },

//     pages:{
//         signIn:"/login"
//     },
//     secret:process.env.NEXTAUTH_SECRET
// };
// const handler=NextAuth(authOptions);
// export {handler as GET,handler as POST};


import NextAuth, { NextAuthOptions }  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User"


export const authOptions: NextAuthOptions= {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"},
            },

            async authorize(credentials){
                const cred=credentials as {email:string;password:string};
                if(!cred.email||!cred.password){
                    throw new Error("missing credentials")
                }
               
                
            await connectDB();

            const user= await User.findOne({email:cred.email});
                if(!user){
                    throw new Error("User not found");
                }

            const isValid= await bcrypt.compare(
                cred.password,
                user.password
            );

            if(!isValid){
                throw new Error("incorrect password")
            }
           
            return {
                id:user._id.toString(),
                name:user.name,
                email:user.email,
                role:user.role,
            }
            }
        })
    ],
    session:{
        strategy:"jwt",
    },

    callbacks:{
        async jwt({token,user}){
            if(user){
                token.role=user.role;
                token.id=user.id;
            }
            return token;
        },
        async session({session,token}){
             if (session.user) {
       session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
        },
    },

    pages:{
        signIn:"/login"
    },
    secret:process.env.NEXTAUTH_SECRET
};
const handler=NextAuth(authOptions);
export {handler as GET,handler as POST};