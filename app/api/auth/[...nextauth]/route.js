// import { PORT } from "@/app/_components/FriendList";
// import axios from "axios";
import NextAuth from "next-auth";

import {authOptions} from "../../../_features/utils/authOption"
const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }