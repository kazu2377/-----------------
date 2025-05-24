const dummyUsers = Array.from({length: 200}, (_, i) => ({
  id: 'U' + String(i+1).padStart(4, '0'),
  name: ['山田 太郎','佐藤 花子','田中 一郎','鈴木 さゆり','高橋 健','伊藤 美咲','渡辺 剛','中村 由美','小林 直樹','加藤 里奈'][i%10],
  gender: i%2===0 ? '男' : '女',
  tel: '03-1234-' + String(1000+i).slice(-4),
  zip: '100-' + String(1000+i).slice(-4),
  address: '東京都千代田区' + (i+1) + '番地'
}));

let userCurrentPage = 1;

function renderUserTable() {
  const displayCount = parseInt(document.getElementById('userDisplayCountSelect').value, 10) || 200;
  const total = dummyUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / displayCount));
  if (userCurrentPage > totalPages) userCurrentPage = totalPages;
  const start = (userCurrentPage - 1) * displayCount;
  const end = displayCount === 200 ? total : start + displayCount;
  const pageData = dummyUsers.slice(start, end);

  const tbody = document.getElementById('userResultTableBody');
  tbody.innerHTML = '';
  pageData.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><input type="checkbox"></td><td>${user.id}</td><td>${user.name}</td><td>${user.gender}</td><td>${user.tel}</td><td>${user.zip}</td><td>${user.address}</td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('userTotalCount').textContent = total;

  // ページセレクト
  const pageSelect = document.getElementById('userPageSelect');
  pageSelect.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    if (i === userCurrentPage) opt.selected = true;
    pageSelect.appendChild(opt);
  }
}

document.getElementById('userSearchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  userCurrentPage = 1;
  renderUserTable();
});
document.getElementById('userDisplayCountSelect').addEventListener('change', function() {
  userCurrentPage = 1;
  renderUserTable();
});
document.getElementById('userPageSelect').addEventListener('change', function(e) {
  userCurrentPage = parseInt(e.target.value, 10);
  renderUserTable();
});
document.getElementById('userPrevPageBtn').addEventListener('click', function() {
  if (userCurrentPage > 1) {
    userCurrentPage--;
    renderUserTable();
  }
});
document.getElementById('userNextPageBtn').addEventListener('click', function() {
  const displayCount = parseInt(document.getElementById('userDisplayCountSelect').value, 10) || 200;
  const totalPages = Math.max(1, Math.ceil(dummyUsers.length / displayCount));
  if (userCurrentPage < totalPages) {
    userCurrentPage++;
    renderUserTable();
  }
});

// メール送信ダイアログの表示・非表示
const mailDialog = document.getElementById('mailDialog');
const openMailDialogBtn = document.getElementById('openMailDialogBtn');
const closeMailDialogBtn = document.getElementById('closeMailDialogBtn');
const mailForm = document.getElementById('mailForm');

openMailDialogBtn.addEventListener('click', function() {
  const checked = document.querySelectorAll('#userResultTableBody input[type="checkbox"]:checked');
  if (checked.length === 0) {
    alert('送信先を選択してください');
    return;
  }
  // 最初の選択ユーザーIDを宛先に
  const firstRow = checked[0].closest('tr');
  document.getElementById('mailTo').value = firstRow.children[1].textContent;
  mailDialog.style.display = 'flex';
});

closeMailDialogBtn.addEventListener('click', function() {
  mailDialog.style.display = 'none';
});

mailForm.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('メールを送信しました！（ダミー）');
  mailDialog.style.display = 'none';
}); 