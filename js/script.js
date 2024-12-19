
// When first starting out, I confused the screens to be switchable - so I made this function to swap between the two
// This is now used for if the user enters input, checks the html for .screen and changes the display value
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';
}

//Switches screen to the chatScreen when use places in input and presses enter
document.querySelectorAll('.chat-box').forEach(chatBox => {
  const chatInput = chatBox.querySelector('.chat-input');
  const sendButton = chatBox.querySelector('.send-icon');
  //on enter, if chat is not empty or null swap to chat
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && chatInput.value.trim() !== "") {
      event.preventDefault();
      handleUserMessage(chatInput.value.trim());
      chatInput.value = "";
    }
  });
  //on click, if chat is not empty or null swap to chat
  sendButton.addEventListener('click', () => {
    if (chatInput.value.trim() !== "") {
      handleUserMessage(chatInput.value.trim());
      chatInput.value = "";
    }
  });
});

// This handles the user messages that are entered..
function handleUserMessage(message) {
  //goes to chatScreen
  showScreen('chatScreen');
  //goes into the chatMessages in the html
  const chatMessages = document.getElementById('chatMessages');
  // it places it as the user via tag
  appendMessage('user', message);
  // after a bit of time, the website then sends back a default message after a timeout of 500 to imitate
  setTimeout(() => {
    appendMessage('bot', "Hi, how can I help you today?");
  }, 500);
}

//This function is to now append a message to format to place into the html
function appendMessage(sender, message) {
  const chatMessages = document.getElementById('chatMessages');
  //creates a div
  const messageContainer = document.createElement('div');
  //creates it based on if the sender is the user or site
  messageContainer.classList.add('message-container', sender === 'user' ? 'user-message' : 'bot-message');
  //makes an image based on user identity
  const profilePic = document.createElement('img');
  profilePic.src = sender === 'user' ? 'icons/tyce_user.png' : 'icons/tyce.png';
  profilePic.alt = sender === 'user' ? 'User' : 'Bot';
  //creates a pfp for chat
  profilePic.classList.add('profile-pic');
  //creates a div tage
  const messageBox = document.createElement('div');
  //adds in the correct tag to apply css
  messageBox.classList.add('message-box');
  messageBox.textContent = message;
  //puts it all together with a scroll action
  messageContainer.appendChild(profilePic);
  messageContainer.appendChild(messageBox);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

//Now, this is to allow adds to the file attachments
document.querySelectorAll('.file-upload-box').forEach((uploadBox, index) => {
  //Gets the values to access the uploadbox
  const fileInput = uploadBox.querySelector('.file-input');
  const paperclip = uploadBox.querySelector('.paperclip-icon');
  //When clicked, it prompts this
  const fileListContainer = document.querySelectorAll('.file-list-container')[index];
  paperclip.addEventListener('click', () => {
    fileInput.click();
  });
  //Also, it prompts you to add a file
  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    files.forEach(file => {
      if (file.type === "text/plain") {
        addFileToList(file, fileListContainer);
      }
    });
    fileInput.value = "";
  });
});


//This function is for adding a file to a list and deleting
function addFileToList(file, container) {
  const fileItem = document.createElement("div");
  fileItem.classList.add("file-item");
  const fileName = document.createElement("span");
  fileName.textContent = file.name;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => {
    container.removeChild(fileItem);
  });
  fileItem.appendChild(fileName);
  fileItem.appendChild(deleteButton);
  container.appendChild(fileItem);
  container.style.display = "block";
}

