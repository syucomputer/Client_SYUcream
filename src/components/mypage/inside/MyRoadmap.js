import "./MyRodamap.css"
import Button from "../../Button/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Roadmap from "./roadmap/Roadmap";
import ManageRoadmap from "./roadmap/ManageRoadmap";
import manageRoadmap from "./roadmap/ManageRoadmap";

const MyRoadmap = () => {
    const [manage, setManage] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/roadmaps/myRoadmap`)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }, []);

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