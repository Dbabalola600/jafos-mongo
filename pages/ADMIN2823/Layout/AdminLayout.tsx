import Head from "next/head";
import Link from "next/link";
import NavBar from "./NavBar";
import { getCookie, hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";






export default function AdminLayout({ children }: { children?: JSX.Element }) {

    const router = useRouter()


    function checkUser() {
        const userCheck = hasCookie("Adminuser")

        console.log(userCheck)

        if (userCheck == false) {
            router.push("/")
        }
    }



    useEffect(() => {
        checkUser()
    }, [])


    return (

        <div className="bg-primaryColour md:space-y-20  min-h-screen">
            <NavBar />
            <div className="bg-white max-w-5xl mx-auto py-20  px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
                <main>
                    <Head>
                        <title>Jafos Admin</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/logo.ico" />
                    </Head>

                    {children}


                </main>

            </div>
        </div>
    )
}

