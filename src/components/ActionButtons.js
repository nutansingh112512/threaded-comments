import { useSelector } from "react-redux";
import { GoReply } from 'react-icons/go';
import Button from "./Button";


function ActionButtons ({ comment }) {
    const { currentUser } = useSelector(state => state);
    console.log(currentUser);
    return (
    <Button className='text-[#5659ba] font-bold hover:scale-105 self-end'>Reply</Button>
    );
}
