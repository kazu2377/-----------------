// ダミー申請データ生成
let dummyApps = Array.from({length: 2000}, (_, i) => ({
  id: 'A' + String(i+1).padStart(5, '0'),
  status: ['未承認','承認中','承認済','差し戻し'][i%4],
  type: ['休暇申請','経費精算','出張申請','備品購入','在宅勤務','勤務変更'][i%6],
  title: ['有給休暇取得','交通費精算','大阪出張','ノートPC購入','在宅勤務希望','勤務時間変更'][i%6] + (i+1),
  applyDate: `2024-06-${String((i%28)+1).padStart(2,'0')}`,
  approveDate: i%4===2 ? `2024-06-${String((i%28)+3).padStart(2,'0')}` : '',
  note: i%5===0 ? '至急対応' : '',
  name: ['山田 太郎','佐藤 花子','田中 一郎','鈴木 さゆり','高橋 健','伊藤 美咲','渡辺 剛','中村 由美','小林 直樹','加藤 里奈'][i%10],
  dept: ['営業部','総務部','開発部','人事部','経理部'][i%5],
  position: ['主任','係長','課長','部長','一般'][i%5],
  deleted: false
}));

let appCurrentPage = 1;
let appStatusFilter = 'all';

function renderAppAdminTable() {
  const displayCount = parseInt(document.getElementById('appDisplayCountSelect').value, 10) || 50;
  appStatusFilter = document.getElementById('appStatusSelect').value;
  const filtered = dummyApps.filter(a => (appStatusFilter === 'all' || a.status === appStatusFilter) && (!a.deleted));
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / displayCount));
  if (appCurrentPage > totalPages) appCurrentPage = totalPages;
  const start = (appCurrentPage - 1) * displayCount;
  const end = displayCount === 2000 ? total : start + displayCount;
  const pageData = filtered.slice(start, end);

  const tbody = document.getElementById('appAdminTableBody');
  tbody.innerHTML = '';
  pageData.forEach((app, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><input type="checkbox" data-index="${start+idx}"></td><td>${app.status}</td><td>${app.id}</td><td>${app.type}</td><td>${app.title}</td><td>${app.applyDate}</td><td>${app.approveDate}</td><td>${app.note}</td><td>${app.name}</td><td>${app.dept}</td><td>${app.position}</td><td><button type="button" class="edit-btn" data-index="${start+idx}">編集</button> <button type="button" class="approve-btn" data-index="${start+idx}">承認</button> <button type="button" class="reject-btn" data-index="${start+idx}">差し戻し</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('appTotalCount').textContent = total;

  // ページセレクト
  const pageSelect = document.getElementById('appPageSelect');
  pageSelect.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    if (i === appCurrentPage) opt.selected = true;
    pageSelect.appendChild(opt);
  }

  // 編集・承認・差し戻しボタンイベント
  tbody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = btn.getAttribute('data-index');
      openAppEditDialog(idx);
    });
  });
  tbody.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = btn.getAttribute('data-index');
      dummyApps[idx].status = '承認済';
      renderAppAdminTable();
    });
  });
  tbody.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = btn.getAttribute('data-index');
      dummyApps[idx].status = '差し戻し';
      renderAppAdminTable();
    });
  });
}

document.getElementById('appDisplayCountSelect').addEventListener('change', function() {
  appCurrentPage = 1;
  renderAppAdminTable();
});
document.getElementById('appStatusSelect').addEventListener('change', function() {
  appCurrentPage = 1;
  renderAppAdminTable();
});
document.getElementById('appPageSelect').addEventListener('change', function(e) {
  appCurrentPage = parseInt(e.target.value, 10);
  renderAppAdminTable();
});
document.getElementById('appPrevPageBtn').addEventListener('click', function() {
  if (appCurrentPage > 1) {
    appCurrentPage--;
    renderAppAdminTable();
  }
});
document.getElementById('appNextPageBtn').addEventListener('click', function() {
  const displayCount = parseInt(document.getElementById('appDisplayCountSelect').value, 10) || 50;
  const filtered = dummyApps.filter(a => (appStatusFilter === 'all' || a.status === appStatusFilter) && (!a.deleted));
  const totalPages = Math.max(1, Math.ceil(filtered.length / displayCount));
  if (appCurrentPage < totalPages) {
    appCurrentPage++;
    renderAppAdminTable();
  }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
  const tbody = document.getElementById('appAdminTableBody');
  const checked = tbody.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach(chk => {
    const idx = parseInt(chk.getAttribute('data-index'), 10);
    dummyApps[idx].deleted = true;
  });
  renderAppAdminTable();
});
document.getElementById('recoverBtn').addEventListener('click', function() {
  const tbody = document.getElementById('appAdminTableBody');
  const checked = tbody.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach(chk => {
    const idx = parseInt(chk.getAttribute('data-index'), 10);
    dummyApps[idx].deleted = false;
  });
  renderAppAdminTable();
});

// 編集ダイアログ
function openAppEditDialog(idx) {
  const app = dummyApps[idx];
  document.getElementById('editStatus').value = app.status;
  document.getElementById('editType').value = app.type;
  document.getElementById('editTitle').value = app.title;
  document.getElementById('editApplyDate').value = app.applyDate;
  document.getElementById('editApproveDate').value = app.approveDate;
  document.getElementById('editNote').value = app.note;
  document.getElementById('editName').value = app.name;
  document.getElementById('editDept').value = app.dept;
  document.getElementById('editPosition').value = app.position;
  document.getElementById('appEditDialog').style.display = 'flex';
  document.getElementById('appEditForm').setAttribute('data-index', idx);
}
document.getElementById('closeAppEditDialogBtn').addEventListener('click', function() {
  document.getElementById('appEditDialog').style.display = 'none';
});
document.getElementById('appEditForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const idx = this.getAttribute('data-index');
  const app = dummyApps[idx];
  app.status = document.getElementById('editStatus').value;
  app.type = document.getElementById('editType').value;
  app.title = document.getElementById('editTitle').value;
  app.applyDate = document.getElementById('editApplyDate').value;
  app.approveDate = document.getElementById('editApproveDate').value;
  app.note = document.getElementById('editNote').value;
  app.name = document.getElementById('editName').value;
  app.dept = document.getElementById('editDept').value;
  app.position = document.getElementById('editPosition').value;
  document.getElementById('appEditDialog').style.display = 'none';
  renderAppAdminTable();
});

// 初期表示
renderAppAdminTable(); 