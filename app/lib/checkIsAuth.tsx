import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { IsLoggedInDocument } from "../__generated__/graphql";

export const checkIsAuth = () => {
    const { data, loading } = useQuery(IsLoggedInDocument);
    const router = useRouter();
    
    useEffect( () => {
        if(!loading && !data?.isLoggedIn.user) {
            router.replace("/login")
        }
    }, [data, loading, router])
}

// a hook to check if user logged in - can use this fn in any page - if user not logged in, he is routed to login
