// ダミーユーザーデータ生成
let dummyUsers = Array.from({length: 50}, (_, i) => ({
  id: 'U' + String(i+1).padStart(4, '0'),
  name: ['山田 太郎','佐藤 花子','田中 一郎','鈴木 さゆり','高橋 健','伊藤 美咲','渡辺 剛','中村 由美','小林 直樹','加藤 里奈'][i%10],
  gender: i%2===0 ? '男' : '女',
  birth: `199${i%10}-0${(i%9)+1}-15`,
  tel: '03-1234-' + String(1000+i).slice(-4),
  mail: `user${i+1}@example.com`,
  zip: '100-' + String(1000+i).slice(-4),
  address: '東京都千代田区' + (i+1) + '番地',
  dept: ['営業部','総務部','開発部','人事部','経理部'][i%5],
  position: ['主任','係長','課長','部長','一般'][i%5],
  role: i%2===0 ? '管理' : '一般',
  features: ['mypage','board','application','user_search','e_learning','user_admin'].filter((_,j)=>j%2===i%2),
  deleted: false
}));

let userCurrentPage = 1;
let userDisplayType = 'active';

function renderUserAdminTable() {
  const displayCount = parseInt(document.getElementById('userDisplayCountSelect').value, 10) || 50;
  userDisplayType = document.getElementById('displayTypeSelect').value;
  const filtered = dummyUsers.filter(u => userDisplayType === 'active' ? !u.deleted : u.deleted);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / displayCount));
  if (userCurrentPage > totalPages) userCurrentPage = totalPages;
  const start = (userCurrentPage - 1) * displayCount;
  const end = displayCount === 200 ? total : start + displayCount;
  const pageData = filtered.slice(start, end);

  const tbody = document.getElementById('userAdminTableBody');
  tbody.innerHTML = '';
  pageData.forEach((user, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><input type="checkbox" data-index="${start+idx}"></td><td>${user.name}</td><td>${user.gender}</td><td>${user.birth}</td><td>${user.tel}</td><td>${user.mail}</td><td>${user.address}</td><td>${user.dept}</td><td>${user.position}</td><td><button type="button" class="edit-btn" data-index="${start+idx}">編集</button></td>`;
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

  // 編集ボタンイベント
  tbody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = btn.getAttribute('data-index');
      openEditDialog(idx);
    });
  });
}

document.getElementById('userDisplayCountSelect').addEventListener('change', function() {
  userCurrentPage = 1;
  renderUserAdminTable();
});
document.getElementById('displayTypeSelect').addEventListener('change', function() {
  userCurrentPage = 1;
  renderUserAdminTable();
});
document.getElementById('userPageSelect').addEventListener('change', function(e) {
  userCurrentPage = parseInt(e.target.value, 10);
  renderUserAdminTable();
});
document.getElementById('userPrevPageBtn').addEventListener('click', function() {
  if (userCurrentPage > 1) {
    userCurrentPage--;
    renderUserAdminTable();
  }
});
document.getElementById('userNextPageBtn').addEventListener('click', function() {
  const displayCount = parseInt(document.getElementById('userDisplayCountSelect').value, 10) || 50;
  const filtered = dummyUsers.filter(u => userDisplayType === 'active' ? !u.deleted : u.deleted);
  const totalPages = Math.max(1, Math.ceil(filtered.length / displayCount));
  if (userCurrentPage < totalPages) {
    userCurrentPage++;
    renderUserAdminTable();
  }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
  const filtered = dummyUsers.filter(u => userDisplayType === 'active' ? !u.deleted : u.deleted);
  const tbody = document.getElementById('userAdminTableBody');
  const checked = tbody.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach(chk => {
    const idx = parseInt(chk.getAttribute('data-index'), 10);
    if (userDisplayType === 'active') dummyUsers[idx].deleted = true;
    else dummyUsers[idx].deleted = false;
  });
  renderUserAdminTable();
});
document.getElementById('recoverBtn').addEventListener('click', function() {
  const filtered = dummyUsers.filter(u => userDisplayType === 'active' ? !u.deleted : u.deleted);
  const tbody = document.getElementById('userAdminTableBody');
  const checked = tbody.querySelectorAll('input[type="checkbox"]:checked');
  checked.forEach(chk => {
    const idx = parseInt(chk.getAttribute('data-index'), 10);
    dummyUsers[idx].deleted = false;
  });
  renderUserAdminTable();
});

// 編集ダイアログ
function openEditDialog(idx) {
  const user = dummyUsers[idx];
  document.getElementById('editName').value = user.name;
  document.getElementById('editGender').value = user.gender;
  document.getElementById('editBirth').value = user.birth;
  document.getElementById('editTel').value = user.tel;
  document.getElementById('editMail').value = user.mail;
  document.getElementById('editZip').value = user.zip || '';
  document.getElementById('editAddress').value = user.address;
  document.getElementById('editDept').value = user.dept;
  document.getElementById('editPosition').value = user.position;
  // 権限
  const roles = document.getElementsByName('editRole');
  roles.forEach(r => { r.checked = (r.value === user.role); });
  // 機能
  const features = document.getElementsByName('editFeature');
  features.forEach(f => { f.checked = user.features && user.features.includes(f.value); });
  document.getElementById('userEditDialog').style.display = 'flex';
  document.getElementById('userEditForm').setAttribute('data-index', idx);
}
document.getElementById('closeEditDialogBtn').addEventListener('click', function() {
  document.getElementById('userEditDialog').style.display = 'none';
});
document.getElementById('userEditForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const idx = this.getAttribute('data-index');
  if (idx === 'new') {
    // 新規追加
    const newUser = {
      id: 'U' + String(dummyUsers.length+1).padStart(4, '0'),
      name: document.getElementById('editName').value,
      gender: document.getElementById('editGender').value,
      birth: document.getElementById('editBirth').value,
      tel: document.getElementById('editTel').value,
      mail: document.getElementById('editMail').value,
      zip: document.getElementById('editZip').value,
      address: document.getElementById('editAddress').value,
      dept: document.getElementById('editDept').value,
      position: document.getElementById('editPosition').value,
      role: Array.from(document.getElementsByName('editRole')).find(r => r.checked)?.value || '一般',
      features: Array.from(document.getElementsByName('editFeature')).filter(f => f.checked).map(f => f.value),
      deleted: false
    };
    dummyUsers.push(newUser);
    document.getElementById('userEditDialog').style.display = 'none';
    renderUserAdminTable();
    return;
  }
  const user = dummyUsers[idx];
  user.name = document.getElementById('editName').value;
  user.gender = document.getElementById('editGender').value;
  user.birth = document.getElementById('editBirth').value;
  user.tel = document.getElementById('editTel').value;
  user.mail = document.getElementById('editMail').value;
  user.zip = document.getElementById('editZip').value;
  user.address = document.getElementById('editAddress').value;
  user.dept = document.getElementById('editDept').value;
  user.position = document.getElementById('editPosition').value;
  // 権限
  const roles = document.getElementsByName('editRole');
  user.role = Array.from(roles).find(r => r.checked)?.value || '一般';
  // 機能
  const features = document.getElementsByName('editFeature');
  user.features = Array.from(features).filter(f => f.checked).map(f => f.value);
  document.getElementById('userEditDialog').style.display = 'none';
  renderUserAdminTable();
});

document.getElementById('addUserBtn').addEventListener('click', function() {
  // 空欄でダイアログを開く
  document.getElementById('editName').value = '';
  document.getElementById('editGender').value = '男';
  document.getElementById('editBirth').value = '';
  document.getElementById('editTel').value = '';
  document.getElementById('editMail').value = '';
  document.getElementById('editZip').value = '';
  document.getElementById('editAddress').value = '';
  document.getElementById('editDept').value = '';
  document.getElementById('editPosition').value = '';
  // 権限
  const roles = document.getElementsByName('editRole');
  roles.forEach(r => { r.checked = (r.value === '一般'); });
  // 機能
  const features = document.getElementsByName('editFeature');
  features.forEach(f => { f.checked = false; });
  document.getElementById('userEditDialog').style.display = 'flex';
  document.getElementById('userEditForm').setAttribute('data-index', 'new');
});

// 初期表示
renderUserAdminTable(); 