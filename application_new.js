document.getElementById('backBtn').addEventListener('click', function() {
  window.location.href = 'application_list.html';
});

document.getElementById('fileUploadBtn').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  document.getElementById('fileNameLabel').textContent = file ? file.name : '申請ファイル';
});
document.getElementById('fileDeleteBtn').addEventListener('click', function() {
  document.getElementById('fileInput').value = '';
  document.getElementById('fileNameLabel').textContent = '申請ファイル';
});

document.getElementById('applicationNewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const docType = document.getElementById('docTypeSelect').value;
  const title = document.getElementById('titleInput').value.trim();
  const contact = document.getElementById('contactInput').value.trim();
  const file = document.getElementById('fileInput').files[0];
  let id = 'A' + (Math.floor(Math.random() * 900) + 100); // 仮ID
  const newApp = {
    状態: '未承認',
    申請ID: id,
    申請種類: docType,
    タイトル: title,
    申請日: new Date().toISOString().slice(0, 10),
    承認日: '',
    連絡事項: contact
  };
  let apps = [];
  try {
    apps = JSON.parse(localStorage.getItem('applications') || '[]');
  } catch {}
  apps.unshift(newApp);
  localStorage.setItem('applications', JSON.stringify(apps));
  window.location.href = 'application_list.html';
}); 