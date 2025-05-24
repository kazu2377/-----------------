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

document.querySelectorAll('.attach-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const idx = btn.getAttribute('data-idx');
    document.getElementById('attachFile' + idx).click();
  });
});

// 添付ファイル名表示・削除
for (let i = 1; i <= 3; i++) {
  const input = document.getElementById('attachFile' + i);
  const label = document.getElementById('fileName' + i);
  if (input && label) {
    input.addEventListener('change', function() {
      label.textContent = input.files[0] ? input.files[0].name + ' ×' : '×';
    });
    label.addEventListener('click', function() {
      input.value = '';
      label.textContent = '×';
    });
  }
}

// 送信・閉じるボタンのidでの動作（念のため）
document.getElementById('mailSendBtn').addEventListener('click', function(e) {
  e.preventDefault();
  alert('メールを送信しました！（ダミー）');
  mailDialog.style.display = 'none';
});
document.getElementById('closeMailDialogBtn').addEventListener('click', function() {
  mailDialog.style.display = 'none';
});

// --- 申請管理ダイアログ用ダミーデータ生成 ---
const dummyApplications = Array.from({length: 50}, (_, i) => {
  const statusArr = ['未承認','承認中','承認済'];
  const typeArr = ['休暇申請','経費精算','出張申請','備品購入','在宅勤務','勤務変更'];
  const titleArr = ['有給休暇取得','交通費精算','大阪出張','ノートPC購入','在宅勤務希望','勤務時間変更'];
  const nameArr = ['山田 太郎','佐藤 花子','田中 一郎','鈴木 さゆり','高橋 健','伊藤 美咲','渡辺 剛','中村 由美','小林 直樹','加藤 里奈'];
  const deptArr = ['営業部','総務部','開発部','人事部','経理部'];
  const posArr = ['主任','係長','課長','部長','一般'];
  const today = new Date();
  const applyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
  const approveDate = i%3===2 ? new Date(today.getFullYear(), today.getMonth(), today.getDate() - i + 2) : '';
  return {
    status: statusArr[i%3],
    id: 'A' + String(i+1).padStart(4,'0'),
    type: typeArr[i%typeArr.length],
    title: titleArr[i%titleArr.length] + (i+1),
    applyDate: applyDate.toLocaleDateString('ja-JP'),
    approveDate: approveDate ? approveDate.toLocaleDateString('ja-JP') : '',
    note: i%5===0 ? '至急対応' : '',
    name: nameArr[i%nameArr.length],
    department: deptArr[i%deptArr.length],
    position: posArr[i%posArr.length],
    file: i%4===0 ? `file${i+1}.pdf` : ''
  };
});
let adminCurrentPage = 1;
let adminStatusFilter = '未承認';
let filteredApplications = dummyApplications;

function renderAdminApplicationTable() {
  const displayCount = parseInt(document.getElementById('adminDisplayCountSelect').value, 10) || 50;
  adminStatusFilter = document.getElementById('adminStatusSelect').value;
  filteredApplications = dummyApplications.filter(a => adminStatusFilter === '' || a.status === adminStatusFilter);
  const total = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(total / displayCount));
  if (adminCurrentPage > totalPages) adminCurrentPage = totalPages;
  const start = (adminCurrentPage - 1) * displayCount;
  const end = displayCount === 50 ? total : start + displayCount;
  const pageData = filteredApplications.slice(start, end);

  const tbody = document.getElementById('adminApplicationTableBody');
  tbody.innerHTML = '';
  pageData.forEach((app, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${app.status}</td><td>${app.id}</td><td>${app.type}</td><td>${app.title}</td><td>${app.applyDate}</td><td>${app.approveDate}</td><td>${app.note}</td><td><button type="button" class="detail-btn" data-index="${start+idx}">詳細</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('adminTotalCount').textContent = total;

  // ページセレクト
  const pageSelect = document.getElementById('adminPageSelect');
  pageSelect.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    if (i === adminCurrentPage) opt.selected = true;
    pageSelect.appendChild(opt);
  }

  // 詳細ボタンイベント再付与
  tbody.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = btn.getAttribute('data-index');
      showApplicationDetail(idx);
    });
  });
}

function showApplicationDetail(idx) {
  const app = filteredApplications[idx];
  document.getElementById('applicationDetailBox').innerHTML = `
    <div>申請状態: <span style="color:red">${app.status}</span></div>
    <div>氏名: ${app.name}</div>
    <div>所属: ${app.department}</div>
    <div>役職: ${app.position}</div>
    <div>申請種類: ${app.type}</div>
    <div>タイトル: <b>${app.title}</b></div>
    <div>申請ファイル: ${app.file || 'なし'}</div>
    <div>連絡事項: ${app.note}</div>
  `;
  document.getElementById('approveBtn').setAttribute('data-index', idx);
  document.getElementById('rejectBtn').setAttribute('data-index', idx);
  document.getElementById('applicationDetailDialog').style.display = 'flex';
}

document.getElementById('approveBtn').addEventListener('click', function() {
  const idx = this.getAttribute('data-index');
  filteredApplications[idx].status = '承認済';
  renderAdminApplicationTable();
  document.getElementById('applicationDetailDialog').style.display = 'none';
});
document.getElementById('rejectBtn').addEventListener('click', function() {
  const idx = this.getAttribute('data-index');
  filteredApplications[idx].status = '差し戻し';
  renderAdminApplicationTable();
  document.getElementById('applicationDetailDialog').style.display = 'none';
});
document.getElementById('closeDetailBtn').addEventListener('click', function() {
  document.getElementById('applicationDetailDialog').style.display = 'none';
});

document.getElementById('openApplicationDialogBtn').addEventListener('click', function() {
  const checked = document.querySelectorAll('#userResultTableBody input[type="checkbox"]:checked');
  if (checked.length === 0) {
    alert('申請確認するユーザーを選択してください');
    return;
  }
  adminCurrentPage = 1;
  document.getElementById('applicationDialog').style.display = 'flex';
  renderAdminApplicationTable();
});
document.getElementById('closeApplicationDialogBtn').addEventListener('click', function() {
  document.getElementById('applicationDialog').style.display = 'none';
});
document.getElementById('adminDisplayCountSelect').addEventListener('change', function() {
  adminCurrentPage = 1;
  renderAdminApplicationTable();
});
document.getElementById('adminStatusSelect').addEventListener('change', function() {
  adminCurrentPage = 1;
  renderAdminApplicationTable();
});
document.getElementById('adminPageSelect').addEventListener('change', function(e) {
  adminCurrentPage = parseInt(e.target.value, 10);
  renderAdminApplicationTable();
});
document.getElementById('adminPrevPageBtn').addEventListener('click', function() {
  if (adminCurrentPage > 1) {
    adminCurrentPage--;
    renderAdminApplicationTable();
  }
});
document.getElementById('adminNextPageBtn').addEventListener('click', function() {
  const displayCount = parseInt(document.getElementById('adminDisplayCountSelect').value, 10) || 50;
  const filtered = dummyApplications.filter(a => adminStatusFilter === '' || a.status === adminStatusFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / displayCount));
  if (adminCurrentPage < totalPages) {
    adminCurrentPage++;
    renderAdminApplicationTable();
  }
}); 