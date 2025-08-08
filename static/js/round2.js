// JSON 파일에서 패킷 데이터 로드
let packetData = [];
let filteredPackets = [];
let selectedPacket = null;

// JSON 파일 로드
async function loadPacketData() {
    try {
        const response = await fetch('/static/data/evidence2.json');
        const data = await response.json();
        console.log('불러온 데이터:', data); 
        packetData = data.packetData;
        filteredPackets = [...packetData];
        document.getElementById('packet-table').style.display = 'table';
        renderPacketList();
    } catch (error) {
        console.error('패킷 데이터 로드 실패:', error);
    }
}
//1:30 타이머 동작
let timeLeft = 90;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function startTimer() {
    const timerText = document.getElementById('round2_timer-text');
    timerText.textContent = formatTime(timeLeft);

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = "00:00";
            // 여기에 타이머 종료 시 동작
            window.location.href = "/main";
        }
    }, 1000);
}
//패킷 내용들 불러오기
function renderPacketList() {
    const tbody = document.getElementById('packet-table-body');
    tbody.innerHTML = '';

    filteredPackets.forEach(packet => {
        const row = document.createElement('tr');
        row.className = 'packet-row';
        if (packet.suspicious) {
            row.classList.add('suspicious');
        }
        if (selectedPacket && selectedPacket.no === packet.no) {
            row.classList.add('selected');
        }

        row.innerHTML = `
            <td>${packet.no}</td>
            <td>${packet.timestamp}</td>
            <td>${packet.sourceIp}</td>
            <td>${packet.destIp}</td>
            <td>${packet.protocol}</td>
            <td>${packet.length}</td>
            <td>${packet.info}</td>
        `;

        row.onclick = () => selectPacket(packet);
        tbody.appendChild(row);
    });

}
//패킷 선택 시, 해당 패킷 상세내용 띄우기
function selectPacket(packet) {
    selectedPacket = packet;
    renderPacketList();
    renderPacketDetail(packet);
    // 오버레이 보여주기
    const detailDiv = document.getElementById('packet-detail');
    detailDiv.style.display = 'block';
}
//패킷 상세내용 불러오기
function renderPacketDetail(packet) {
    const detailDiv = document.getElementById('packet-detail');

    let summary = `
No: ${packet.no}
Timestamp: ${packet.timestamp}
Source IP: ${packet.sourceIp}
Destination IP: ${packet.destIp}
Protocol: ${packet.protocol}
Length: ${packet.length}

`;

    if (packet.info) {
        summary += `Info: ${packet.info}\n\n`;
    }

    if (packet.detail?.http) {
        const http = packet.detail.http;
        summary += `Request Line: ${http.method || ''} ${http.uri || ''} HTTP/1.1\n`;
        summary += `Host: ${http.host || ''}\n`;
        if (http.userAgent) summary += `User-Agent: ${http.userAgent}\n`;
        if (http.referer) summary += `Referer: ${http.referer}\n`;
        if (http.accept) summary += `Accept: ${http.accept}\n`;
        summary += `\n`;
    }

    if (packet.detail?.dns) {
        const dns = packet.detail.dns;
        summary += `DNS Query: ${dns.query || ''}\n`;
        if (dns.responseIp) summary += `Response IP: ${dns.responseIp}\n`;
        summary += `\n`;
    }

    if (packet.detail?.tcp) {
        const tcp = packet.detail.tcp;
        summary += `TCP Source Port: ${tcp.srcPort || ''}\n`;
        summary += `TCP Destination Port: ${tcp.dstPort || ''}\n\n`;
    }

    if (packet.detail?.udp) {
        const udp = packet.detail.udp;
        summary += `UDP Source Port: ${udp.srcPort || ''}\n`;
        summary += `UDP Destination Port: ${udp.dstPort || ''}\n\n`;
    }

    detailDiv.innerHTML = `
        <div style="text-align: right;">
            <button onclick="closePacketDetail()" style="background:#e74c3c; color:white; border:none; padding:3px 4px; font-size:10px; cursor:pointer;">닫기 ✖</button>
        </div>
        <h4 style="margin: -20px 0 10px 0;">Packet #${packet.no} 상세정보</h4>
        <pre style="background-color: #1e1e1e; color: #dcdcdc; padding: 12px; border-radius: 8px; font-size: 13px; overflow-x: auto; white-space: pre-line; font-family: monospace; **font-weight: bold; text-align: left;**">
${summary.trim()}
        </pre>
    `;

    detailDiv.style.display = 'block';
}

//검색 기능(필터링)
function filterPackets() {
    const protocolFilter = document.getElementById('protocol-filter').value.toLowerCase();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    filteredPackets = packetData.filter(packet => {
        const matchesProtocol = !protocolFilter || packet.protocol.toLowerCase() === protocolFilter;
        const matchesSearch = !searchTerm || 
            packet.sourceIp.toLowerCase().includes(searchTerm) ||
            packet.destIp.toLowerCase().includes(searchTerm) ||
            packet.info.toLowerCase().includes(searchTerm) ||
            (packet.detail.http && packet.detail.http.host && packet.detail.http.host.toLowerCase().includes(searchTerm)) ||
            (packet.detail.dns && packet.detail.dns.query && packet.detail.dns.query.toLowerCase().includes(searchTerm));

        return matchesProtocol && matchesSearch;
    });

    renderPacketList();
}

//필터링 초기화
function clearFilters() {
    document.getElementById('protocol-filter').value = '';
    document.getElementById('search-input').value = '';
    filteredPackets = [...packetData];
    renderPacketList();
}
//힌트 클릭시 3,4,5 패킷(범인) 빨간색으로 표시됐다 사라짐
function showHint() {
    const container = document.querySelector('.round2-packetlist-container');
    container.classList.add('show-hint');
    // 0.2초 후 원상복귀
    setTimeout(() => {
        container.classList.remove('show-hint');
    }, 200);
}
//패킷 상세 내용 창 닫기(닫기 버튼 클릭 시, 사용 )
function closePacketDetail() {
    document.getElementById('packet-detail').style.display = 'none';
}

window.onload = startTimer;