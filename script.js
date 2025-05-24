document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();
  if (userId && password) {
    window.location.href = 'mypage.html';
  } else {
    alert('ユーザーIDとパスワードを入力してください');
  }
}); 