// Sample channel data and messages (in a real application, these would be fetched from your backend)
const channels = [
    { id: 1, name: 'General AI' },
    { id: 2, name: 'Deep Learning' },
    { id: 3, name: 'Machine Learning' },
    { id: 4, name: 'NLP' },
    { id: 5, name: 'Robotics' }
  ];
  
  let currentChannel = channels[0]; // Default channel
  
  // Sample messages grouped by channel ID
  const messages = {
    1: [
      { sender: 'System', content: 'Welcome to the General AI channel!', timestamp: '10:00 AM' },
      { sender: 'Alice', content: 'Hi everyone!', timestamp: '10:05 AM' }
    ],
    2: [
      { sender: 'System', content: 'Welcome to the Deep Learning channel!', timestamp: '10:00 AM' }
    ],
    3: [],
    4: [],
    5: []
  };
  
  // Function to render the channel list in the sidebar
  function renderChannels() {
    const channelListEl = document.getElementById('channelList');
    channelListEl.innerHTML = '';
    channels.forEach(channel => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.textContent = channel.name;
      a.addEventListener('click', () => {
        // Set active channel and update UI accordingly
        document.querySelectorAll('.channel-list li a').forEach(el => el.classList.remove('active'));
        a.classList.add('active');
        currentChannel = channel;
        document.getElementById('chatHeader').textContent = channel.name;
        renderMessages();
      });
      li.appendChild(a);
      channelListEl.appendChild(li);
    });
    // Mark the first channel as active by default
    const firstChannel = document.querySelector('.channel-list li a');
    if (firstChannel) {
      firstChannel.classList.add('active');
    }
  }
  
  // Function to render messages for the current channel
  function renderMessages() {
    const chatMessagesEl = document.getElementById('chatMessages');
    chatMessagesEl.innerHTML = '';
    (messages[currentChannel.id] || []).forEach(msg => {
      const messageEl = document.createElement('div');
      messageEl.classList.add('message');
      messageEl.innerHTML = `
        <div class="sender">${msg.sender}</div>
        <div class="content">${msg.content}</div>
        <div class="timestamp">${msg.timestamp}</div>
      `;
      chatMessagesEl.appendChild(messageEl);
    });
    // Scroll to the bottom to show the latest message
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }
  
  // Handle sending a new message
  document.getElementById('sendBtn').addEventListener('click', () => {
    const inputEl = document.getElementById('messageInput');
    const content = inputEl.value.trim();
    if (content === '') return;
    
    // Create a new message object
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newMessage = { sender: 'You', content: content, timestamp: timestamp };
    
    // Append message to the current channel's message list
    if (!messages[currentChannel.id]) {
      messages[currentChannel.id] = [];
    }
    messages[currentChannel.id].push(newMessage);
    
    // Clear the input and refresh the message list
    inputEl.value = '';
    renderMessages();
  });
  
  // Initialize the interface
  renderChannels();
  renderMessages();