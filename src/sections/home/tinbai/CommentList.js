import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import { PostComment } from './PostComment';
import { CommentItem } from './CommentItem';

// ----------------------------------------------------------------------

export function CommentList({ baiViet, comments }) {
  return (
    <>
      <PostComment id={baiViet} />
      <div style={{ marginLeft: '10%', marginRight: '10%' }}>
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
