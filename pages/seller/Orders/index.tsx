import CatLayout from "../Layout/CatLayout";
import Header from "../../../components/shared/Header";
import CusCollapse from "../../../components/shared/CusCollapse";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";





type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}




type OrderItems = {
    _doc: any
    _id: string;
    product: string;
    storename: string;
    price: number;
    quantity: number;
    amount: number;
    user: string;
    userObj: {
        firstname: string
        lastname: string
        matricno: string
        _id: string
    }
}




function Orders() {
    const router = useRouter()
    const [seller, setSeller] = useState<Seller | null>(null);

    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

    const showinfo = async () => {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response.storename)




        const body2 = {
            name: response.storename
        }




        const OrderResponse = await fetch("/api/seller/order/fetchOrder", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as OrderItems[]

        setOrderItems(OrderResponse)
        console.log(OrderResponse[0])

    }

    useEffect(() => {
        showinfo()
    }, []
    )



    return (
        <CatLayout>
            <>
                <Header
                    title="ORDERS"
                />


                <div
                    className="btn btn-primary"
                    onClick={() => router.push("/seller/Orders/all")}
                >
All Orders
                </div>




                {orderItems.map((orderItem: {
                    _doc: any;
                    _id: string;
                    storename: string
                    product: string
                    user: string
                    price: number;
                    quantity: number;
                    amount: number;
                    userObj: {
                        firstname: string
                        _id: string
                        lastname: string
                        matricno: string
                    }
                }) => (
                    <div
                        key={orderItem._id}
                    >
                        <CusCollapse
                            title={orderItem._doc.product}
                            info={orderItem?.userObj?.firstname}
                            clickButton={() => router.push(`/seller/Orders/Details/${orderItem._doc._id}`)}
                        />
                    </div>
                ))}


            </>
        </CatLayout>
    )
}

export default Orders;