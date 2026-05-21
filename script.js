// 全局变量声明
let vocabularyData = []; // 存储从JSON加载的数据
const audioPlayer = document.getElementById('wordAudio'); // 获取音频DOM元素

// 1. 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载完成，开始初始化...");
    loadData();
    setupEventListeners();
});

// 2. 加载数据 (模拟从文本数据库读取)
function loadData() {
    // 使用Fetch API 模拟读取文本文件
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            vocabularyData = data;
            console.log("数据加载成功:", data);
            renderCards(vocabularyData); // 渲染所有卡片
        })
        .catch(error => {
            console.error('数据加载失败:', error);
            document.getElementById('cardContainer').innerHTML = '<div class="col-12"><div class="alert alert-danger">加载数据失败，请检查 data.json 文件是否存在。</div></div>';
        });
}

// 3. 设置事件监听器 (交互逻辑)
function setupEventListeners() {
    const filterSelect = document.getElementById('categoryFilter');
    
    // 监听筛选框的变化事件
    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        console.log("用户选择了分类:", selectedCategory);
        
        // 过滤数据
        let filteredData;
        if (selectedCategory === 'all') {
            filteredData = vocabularyData;
        } else {
            filteredData = vocabularyData.filter(item => item.category === selectedCategory);
        }
        
        // 重新渲染界面
        renderCards(filteredData);
    });
}

// 4. 渲染卡片界面 (CSS布局与DOM操作)
function renderCards(data) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // 清空旧内容

    if (data.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info text-center">没有找到相关数据。</div></div>';
        return;
    }

    // 遍历数据生成HTML
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100" data-id="${item.id}">
                <img src="${item.image}" class="card-img-top" alt="${item.word}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${item.word}</h5>
                    <p class="card-text text-center text-muted">${item.chinese}</p>
                    <button class="btn btn-primary mt-auto" onclick="playSound('${item.audio}', '${item.word}')">
                        听发音 🎧
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 5. 动态交互函数：播放声音
function playSound(audioUrl, word) {
    console.log(`播放声音: ${word}`);
    audioPlayer.src = audioUrl;
    audioPlayer.play()
        .then(() => console.log("播放成功"))
        .catch(e => console.error("播放失败:", e));
}