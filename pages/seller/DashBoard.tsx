import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";


function DashBoard (){
    return (
        <CatLayout>
            <>

            <div 
            className=" bg-black md:w-60">
            <Header
            title="WELCOME USER"
            desc="this is the caterer dashboard"
            />
            </div>
           
            </>
        </CatLayout>
    )
}

export default DashBoard;