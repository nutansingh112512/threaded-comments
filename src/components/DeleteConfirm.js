import { useDispatch } from "react-redux";
import Button from "./Button";
import Modal from "./Modal";
import { removeComment } from "../store";


function DeleteConfirm({ parentId, setShowDeleteConfirm}) {
    const dispatch = useDispatch();

    const handleCancelDelete = () => setShowDeleteConfirm(false);
    const handleDelete = () => dispatch(removeComment(parentId));

    const actionBar = <>
        <Button onClick={handleCancelDelete} className="bg-[#66727f] text-white font-medium hover:opacity-70 rounded-lg whitespace-nowrap px-3 py-1 sm:py-2">NO, CANCEL</Button>
        <Button onClick={handleDelete} className="bg-[#fd5b5f] text-white font-medium hover:opacity-70 rounded-lg whitespace-nowrap px-3 sm:px-5 py-1 sm:py-2">YES, DELETE</Button>
    </>

    return (
        <Modal onClose={handleCancelDelete} actionBar={actionBar}>
            <h2 className="font-bold text-xl mb-4 text-gray-600">Delete Comment</h2>
            <p className="mb-4 font-medium text-gray-500">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        </Modal>
    );
}

export default DeleteConfirm;