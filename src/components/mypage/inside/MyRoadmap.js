import { useState } from "react";
import Roadmap from "./roadmap/Roadmap";
import ManageRoadmap from "./roadmap/MapnageRoadmap";

const MyRoadmap = () => {
    const [manage, setManage] = useState(false);
    // const navigate = useNavigate();

    const handleManage = () => {
        setManage(!manage);
    }

    return(
        <div className="">
            {!manage ? <Roadmap setManage={handleManage}/> : <ManageRoadmap setManage={handleManage} />}
        </div>
    )
}

export default MyRoadmap;