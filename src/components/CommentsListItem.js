import { GoPencil, GoReply, GoTrash } from 'react-icons/go';
import Avatar from './Avatar';
import Button from './Button';
import Panel from './Panel';
import { useEffect, useRef, useState } from 'react';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { changeVote } from '../store';
import EditBox from './EditBox';
import DeleteConfirm from './DeleteConfirm';


function timeAgo(dateString) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000; // seconds difference

  const times = [
    { unit: 'year',   value: 60 * 60 * 24 * 365 },
    { unit: 'month',  value: 60 * 60 * 24 * 30 },
    { unit: 'week',   value: 60 * 60 * 24 * 7 },
    { unit: 'day',    value: 60 * 60 * 24 },
    { unit: 'hour',   value: 60 * 60 },
    { unit: 'minute', value: 60 },
    { unit: 'second', value: 1 },
  ];

  for (let t of times) {
    const delta = Math.floor(diff / t.value);
    if (Math.abs(delta) >= 1) {
      return rtf.format(-delta, t.unit);
    }
  }
  return 'just now';
}

function CommentsListItem ({ comment }) {
    const {author, createdAt, message, voteCount, avatar} = comment;
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.comments);
    const parentId = comment.author+comment.createdAt;
    
    const replyBox = useRef(null);
    const handleReplyClick = () => {
        setShowReplyBox(prev => !prev);
    }
    const handleUpVote = () => dispatch(changeVote({parentId, voteType: 'increment'}));
    const handleDownVote = () => dispatch(changeVote({parentId, voteType: 'decrement'}));

    useEffect(() => {
        if (showReplyBox && replyBox.current) {
            replyBox.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [showReplyBox])
    return (
        <div>
            <Panel>
                <div className='flex flex-col items-center rounded-lg bg-[#f5f6fa] sm:mr-5 mr-3 overflow-hidden'>
                    <Button onClick={handleUpVote} className='px-3 hover:opacity-50'>+</Button>
                    {voteCount}
                    <Button onClick={handleDownVote} className='px-3 hover:opacity-50'>-</Button>
                </div>
                <div className='flex flex-col w-[100%] gap-3'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                        <div className='flex flex-row items-center sm:gap-3'>
                            <Avatar avatar={avatar} />
                            <h2 className='font-medium'>{author}</h2>
                            <p className='text-gray-500 ml-2'>{timeAgo(createdAt)}</p>
                        </div>
                        {
                            currentUser.author === comment.author
                            ?<div className='flex flex-row self-end'>
                                <Button className='text-[#fd5b5f] font-bold hover:opacity-70' onClick={()=>setShowDeleteConfirm(true)} ><GoTrash className='mr-1' />Delete</Button>
                                {showDeleteConfirm && <DeleteConfirm parentId={parentId} setShowDeleteConfirm={setShowDeleteConfirm} />}
                                <Button className='text-[#5659ba] font-bold hover:opacity-70' onClick={()=>setShowEditBox(prev=>!prev)} ><GoPencil className='mr-1' />Edit</Button>
                            </div>
                            :<Button className='text-[#5659ba] font-bold hover:opacity-70 self-end' onClick={handleReplyClick}><GoReply className='mr-1' />Reply</Button>
                        }
                    </div>
                    {
                        showEditBox
                        ?<EditBox comment={comment} setShowEditBox={setShowEditBox} />
                        :<p className='text-gray-500'>{message}</p>
                    }
                    {showReplyBox && <CommentBox ref={replyBox} type='REPLY' parentId={parentId} setShowReplyBox={setShowReplyBox} />}
                </div>
            </Panel>
            <div className='pl-2 sm:pl-8'>
                <div className='border-l-3 border-gray-300 pl-2 sm:pl-8'>
                    {
                        comment.comments && comment.comments.length > 0 && comment.comments.map(reply => <CommentsListItem key={reply.author+reply.createdAt} comment={reply} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default CommentsListItem;