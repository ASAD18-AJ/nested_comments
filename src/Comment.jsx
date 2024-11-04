import React, { useState,useRef } from 'react'


function Comment({comment,addReply}){
  const [showReplybox,setShowReplyBox] = useState(false);
  const [replyText,setReplyText] = useState('')
  const inputRef = useRef(null)
  
  const handleReply = (e) => {
    setShowReplyBox(true);
    setTimeout(()=> {
      inputRef.current.focus()
    })
  }

  const handleCancelButton = () => {
    setShowReplyBox(false)
    setReplyText('')
  }

  const handleReplySave = (commentId) => {
    console.log('----save---', commentId, replyText)
    addReply(commentId, replyText)
    setShowReplyBox(false)
    setReplyText('')
  }

  const handleKeyDown = (e, commentId) => {
    console.log(e.key)
    if(e.key === 'Enter'){
      handleReplySave(commentId)
    }else if (e.key === 'Escape'){
      handleCancelButton()
    }
  }
  
  
  return (
     <>
     <li key={comment.id} className='comment-line'>
        {comment.display}
        {
          !showReplybox && (
            <button onClick={handleReply}>Reply</button>
          )
        }
        {/* show reply box */}
        {
          showReplybox ? (
            <>
            <br/>
            <input type='text' 
              value={replyText}
              ref={inputRef}
              onChange={(e) => setReplyText(e.target.value)}
              // onClick={}
              onKeyDown={(e)=> handleKeyDown(e, comment.id)}
            />
            
            <br/>

            <button className='btn' onClick={()=> handleReplySave(comment.id)}> Save </button>
            <button className='btn' onClick={handleCancelButton}> Cancel </button>
            </>
          ): null
        }
        {
          comment.children.length ? (
            <ul>
              {
                comment.children.map((item)=> (
                  <Comment key={item.id} comment={item} addReply={addReply}/>
                ))
              }
            </ul>
          ): null     
        }
        
     </li>
    </>
  )
}

export default Comment;