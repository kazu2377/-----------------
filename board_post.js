document.getElementById('cancelBtn').addEventListener('click', function() {
  window.location.href = 'board.html';
});

document.getElementById('boardPostForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const importance = document.getElementById('postImportance').value;
  const content = document.getElementById('postContent').value.trim();
  const newPost = {
    状態: '表示中',
    種類: category,
    重要度: importance,
    件名: title,
    内容: content,
    投稿者: 'ニックネーム',
    投稿日: new Date().toISOString().slice(0, 10)
  };
  let posts = [];
  try {
    posts = JSON.parse(localStorage.getItem('boardPosts') || '[]');
  } catch {}
  posts.unshift(newPost);
  localStorage.setItem('boardPosts', JSON.stringify(posts));
  window.location.href = 'board.html';
}); 