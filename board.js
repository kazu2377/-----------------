const dummyData = [
  { 状態: '表示中', 種類: 'お知らせ', 重要度: '高', 件名: '社内イベント開催', 内容: '来週イベントがあります', 投稿者: '佐藤 花子', 投稿日: '2024-06-01' },
  { 状態: '表示中', 種類: '連絡', 重要度: '中', 件名: 'システムメンテ', 内容: '6/10にメンテナンス', 投稿者: '山田 太郎', 投稿日: '2024-06-02' },
  { 状態: '非表示', 種類: '質問', 重要度: '低', 件名: '新機能について', 内容: '使い方を教えて', 投稿者: '田中 一郎', 投稿日: '2024-06-03' },
  { 状態: '表示中', 種類: 'お知らせ', 重要度: '高', 件名: '新入社員歓迎会', 内容: '今月末に開催', 投稿者: '鈴木 さゆり', 投稿日: '2024-06-04' },
  { 状態: '表示中', 種類: '連絡', 重要度: '低', 件名: '備品発注', 内容: '必要な備品を連絡', 投稿者: '佐藤 花子', 投稿日: '2024-06-05' },
];

function renderTable(data) {
  const tbody = document.getElementById('boardTableBody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  document.getElementById('totalCount').textContent = data.length;
}

function filterData() {
  const status = document.getElementById('statusSelect').value;
  const field = document.getElementById('searchFieldSelect').value;
  const keyword = document.getElementById('searchInput').value.trim();
  const displayCount = parseInt(document.getElementById('displayCountSelect').value, 10);
  let filtered = dummyData.filter(row => row['状態'] === status);
  if (keyword) {
    filtered = filtered.filter(row => String(row[field]).includes(keyword));
  }
  renderTable(filtered.slice(0, displayCount));
}

document.getElementById('searchBtn').addEventListener('click', filterData);
document.getElementById('statusSelect').addEventListener('change', filterData);
document.getElementById('searchFieldSelect').addEventListener('change', filterData);
document.getElementById('displayCountSelect').addEventListener('change', filterData);

window.addEventListener('DOMContentLoaded', () => {
  filterData();
}); 