import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../components/shared/ErrMess";
import GoodMess from "../../../components/shared/GoodMess";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import TextInput from "../../../components/shared/TextInput";
import StuLayout from "../Layout/StuLayout";

type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
    account_bal: number
}


type Orders = {
    _id: string
    user: string
    product: string
    storename: string
    price: number
    quantity: number
    amount: number
    status: string
    p_status: string
    mod: string
}



export default function deliveryMethod() {
    const [student, setStudent] = useState<Student | null>(null);
    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)


    const [showtoast, settoast] = useState({ message: "", show: false })

    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })





    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])


    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/student/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


        setOrders(response)


    }

    const massId: string[] = []

    for (let i = 0; i < orders.length; i++) {
        massId.push(orders[i]._id)
    }

    console.log(massId)

    const update: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)


        const form = e.currentTarget.elements as any


        const body = {
            massId: massId,
            methUp: form.item(0).value

        }


        const response = await fetch("/api/student/order/updateDeliveryMethod", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.push("/student/checkout/payment")
                }
                else {
                    settoast({ message: " message", show: true })
                }
            }).catch(err => {
                console.log(err)
            })






        setLoading(false)
    }





    useEffect(() => {
        showOrder()
    }, [])


    return (
        <StuLayout>
            <>

                <Header
                    title="update Delivery Mehtod "
                />




                {showtoast.show && <ErrMess title="something when wrong, try again later" />}
                {showgoodtoast.show && <GoodMess title="Delivery Address added" />}




                {orders.map((order: {
                    _id: string | null
                    user: string
                    product: string
                    storename: string
                    price: number
                    quantity: number
                    amount: number
                    status: string
                    p_status: string
                    mod: string
                }) =>
                    <div
                        key={order._id}
                    >


                        <div
                            className="text-red-500 mt-10"
                        >
                            Product name:  {order.product}
                            <p>
                                Method of Delivery:{order.mod}
                            </p>
                        </div>





                    </div>
                )}



                <form
                    className="w-full py-20 space-y-12  text-black text-base md:text-xl"
                    onSubmit={update}
                >

                    <div className="mx-auto  w-full ">
                        <TextInput
                            placeholder="Input delivery instructions"
                            name="Input delivery instructions"
                            type='text'

                        />
                    </div>



                    <div className=" w-full  space-y-6">

                        <button className="w-full btn-primary btn "
                            type="submit">
                            {isLoading ? "Loading..." : "Proceed"}
                            {/* Proceed */}
                        </button>
                    </div>
                </form>






            </>
        </StuLayout>
    )
}