import { GoReply, GoTrash } from 'react-icons/go';
import Avatar from './Avatar';
import Button from './Button';
import Panel from './Panel';
import { useEffect, useRef, useState } from 'react';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { changeVote, removeComment } from '../store';


function timeAgo(dateString) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const date = new Date(dateString);
  const now = new Date();
  const diff = (date - now) / 1000; // seconds difference

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
      return rtf.format(delta, t.unit);
    }
  }
  return 'just now';
}

function CommentsListItem ({ comment }) {
    const {author, createdAt, message, voteCount, avatar} = comment;
    const [showReplyBox, setShowReplyBox] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.comments);
    const parentId = comment.author+comment.createdAt;
    
    const replyBox = useRef(null);
    const handleReplyClick = () => {
        setShowReplyBox(prev => !prev);
    }
    const handleUpVote = () => dispatch(changeVote({parentId, voteType: 'increment'}));
    const handleDownVote = () => dispatch(changeVote({parentId, voteType: 'decrement'}));
    const handleRemoveComment = () => dispatch(removeComment(parentId));

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
                <div className='flex flex-col w-full gap-3'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                        <div className='flex flex-row items-center sm:gap-3'>
                            <Avatar avatar={avatar} />
                            <h2 className='font-bold'>{author}</h2>
                            <p className='text-gray-500 ml-1'>{timeAgo(createdAt)}</p>
                        </div>
                        {
                            currentUser.author === comment.author
                            ?<div className='flex flex-row self-end'>
                                <Button className='text-[#fd5b5f] font-bold hover:opacity-70' onClick={handleRemoveComment} ><GoTrash className='mr-1' />Delete</Button>
                                <Button className='text-[#5659ba] font-bold hover:opacity-70' ><GoReply className='mr-1' />Edit</Button>
                            </div>
                            :<Button className='text-[#5659ba] font-bold hover:opacity-70 self-end' onClick={handleReplyClick}><GoReply className='mr-1' />Reply</Button>
                        }
                    </div>
                    <p className='text-gray-500'>{message}</p>
                    {showReplyBox && <CommentBox ref={replyBox} type='REPLY' parentId={parentId} setShowReplyBox={setShowReplyBox} />}
                    {
                        comment.comments && comment.comments.length > 0 && comment.comments.map(reply => <CommentsListItem key={reply.author+reply.createdAt} comment={reply} />)
                    }
                </div>
            </Panel>
        </div>
    );
}

export default CommentsListItem;