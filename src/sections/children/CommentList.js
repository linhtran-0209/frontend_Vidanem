// @mui
import { Box, List } from '@mui/material';
//
import { PostComment } from './PostComment';
import { CommentItem } from './CommentItem';

// ----------------------------------------------------------------------

export function CommentList({ treEm, comments }) {
  return (
    <>
      <PostComment id={treEm} />
      <div>
        {comments.length > 0 ? (
          <h3 style={{ color: '#FF3030' }}>Lời chúc</h3>
        ) : (
          <p style={{ textAlign: 'center' }}>
            <span style={{ color: '#DF0029' }}>❤</span> 
            Bạn hãy là người đầu tiên gửi lời chúc đến em{' '}
            <span style={{ color: '#DF0029' }}>❤</span>
          </p>
        )}
        <List disablePadding>
          {comments.map((comment) => {
            const { _id, email, hoTen, child, createdAt } = comment;
            const hasReply = child.length > 0;

            return (
              <Box key={_id} sx={{}}>
                <CommentItem
                  _id={_id}
                  name={comment.hoTen}
                  avatarUrl={comment.email}
                  email={comment.email}
                  postedAt={comment.createdAt}
                  comment={comment.comment}
                />
                {hasReply &&
                  child.map((reply, index) => {
                    return (
                      <CommentItem
                        key={index}
                        avatarUrl={reply.email}
                        email={reply.email}
                        postedAt={reply.createdAt}
                        name={reply.hoTen}
                        comment={reply.comment}
                        hasReply
                      />
                    );
                  })}
              </Box>
            );
          })}
        </List>
      </div>
    </>
  );
}
