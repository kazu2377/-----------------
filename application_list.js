const dummyApplications = [
  { 状態: '未承認', 申請ID: 'A001', 申請種類: '休暇届', タイトル: '夏季休暇申請', 申請日: '2024-06-01', 承認日: '', 連絡事項: '' },
  { 状態: '承認中', 申請ID: 'A002', 申請種類: '経費精算', タイトル: '出張経費', 申請日: '2024-06-02', 承認日: '', 連絡事項: '確認中' },
  { 状態: '承認済', 申請ID: 'A003', 申請種類: '備品購入', タイトル: 'ノートPC購入', 申請日: '2024-06-03', 承認日: '2024-06-04', 連絡事項: '' },
  { 状態: '未承認', 申請ID: 'A004', 申請種類: '休暇届', タイトル: '有給休暇申請', 申請日: '2024-06-05', 承認日: '', 連絡事項: '' },
  { 状態: '承認中', 申請ID: 'A005', 申請種類: '経費精算', タイトル: '会議費用', 申請日: '2024-06-06', 承認日: '', 連絡事項: '' },
  { 状態: '承認済', 申請ID: 'A006', 申請種類: '備品購入', タイトル: 'マウス購入', 申請日: '2024-06-07', 承認日: '2024-06-08', 連絡事項: '' },
  { 状態: '未承認', 申請ID: 'A007', 申請種類: '休暇届', タイトル: '特別休暇', 申請日: '2024-06-09', 承認日: '', 連絡事項: '' },
];

let currentPage = 1;

function getAllApplications() {
  let apps = [];
  try {
    apps = JSON.parse(localStorage.getItem('applications') || '[]');
  } catch {}
  return apps.concat(dummyApplications);
}

function getFilteredData() {
  const status = document.getElementById('statusSelect').value;
  return getAllApplications().filter(row => row['状態'] === status);
}

function renderTable() {
  const displayCount = parseInt(document.getElementById('displayCountSelect').value, 10);
  const filtered = getFilteredData();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / displayCount));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * displayCount;
  const end = start + displayCount;
  const pageData = filtered.slice(start, end);

  const tbody = document.getElementById('applicationTableBody');
  tbody.innerHTML = '';
  pageData.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  document.getElementById('totalCount').textContent = total;

  // ページセレクト
  const pageSelect = document.getElementById('pageSelect');
  pageSelect.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    if (i === currentPage) opt.selected = true;
    pageSelect.appendChild(opt);
  }
}

document.getElementById('statusSelect').addEventListener('change', () => { currentPage = 1; renderTable(); });
document.getElementById('displayCountSelect').addEventListener('change', () => { currentPage = 1; renderTable(); });
document.getElementById('pageSelect').addEventListener('change', e => { currentPage = parseInt(e.target.value, 10); renderTable(); });
document.getElementById('prevPageBtn').addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
document.getElementById('nextPageBtn').addEventListener('click', () => {
  const displayCount = parseInt(document.getElementById('displayCountSelect').value, 10);
  const filtered = getFilteredData();
  const totalPages = Math.max(1, Math.ceil(filtered.length / displayCount));
  if (currentPage < totalPages) { currentPage++; renderTable(); }
});
document.getElementById('newApplicationBtn').addEventListener('click', () => {
  window.location.href = 'application_new.html';
});

window.addEventListener('DOMContentLoaded', () => {
  renderTable();
}); 