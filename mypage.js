document.querySelectorAll('.post-btn, .comment-post-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    alert('ダミー動作：投稿しました');
  });
});
document.querySelectorAll('.edit-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    alert('ダミー動作：編集ボタン');
  });
});
document.querySelectorAll('.delete-btn, .comment-delete').forEach(btn => {
  btn.addEventListener('click', function() {
    alert('ダミー動作：削除ボタン');
  });
});

// 新投稿画像クリックでファイル選択
const preview = document.getElementById('newPostImagePreview');
const input = document.getElementById('newPostImageInput');
const imgTag = document.getElementById('newPostImageTag');
const text = document.getElementById('newPostImageText');
if (preview && input && imgTag && text) {
  preview.addEventListener('click', () => input.click());
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        imgTag.src = ev.target.result;
        imgTag.style.display = 'block';
        text.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });
}

// 投稿ボタンのダミーアラート
const newPostForm = document.getElementById('newPostForm');
if (newPostForm) {
  newPostForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('ダミー動作：投稿しました');
  });
} 