pragma solidity ^0.5.0;

contract Decentragram {
  string public name = "Decentragram";
  uint public imageCount= 0;
  // Save Images
  mapping(uint => Image) public images;

  struct Image {
  	uint id;
  	string hash;
  	string description;
  	uint tipAmount;
  	address payable author;
  }

  event ImageCreated(
  	uint id,
  	string hash,
  	string description,
  	uint tipAmount,
  	address payable author
  );

   event ImageTipped(
  	uint id,
  	string hash,
  	string description,
  	uint tipAmount,
  	address payable author
  );

  // Create Images
  function uploadImage(string memory _imgHash, string memory _description) public {
  	
  	require(bytes(_imgHash).length > 0, 'Hash needs to exist');
  	require(bytes(_description).length > 0, 'Description cannot be empty');
  	require(msg.sender != address(0x0), 'Sender needs to exist');

  	// increment imageCount
  	imageCount ++;
  	// Add new Image
  	images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);
  	// Log Event
  	emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  }
  


  // Tip  Images
  function tipImage(uint _id) public payable {
  	
  	require(_id <= imageCount && _id > 0, "Must tip to existing Image");
  	require(msg.sender != address(0x0), 'Sender needs to exist');

  	Image memory _image = images[_id];
  	address payable _author = _image.author;

  	(bool success, ) = address(_author).call.value(msg.value)("");
    require(success, "Transfer failed.");

  	_image.tipAmount += msg.value;
  	images[_id] = _image;

  	emit ImageTipped(_id, _image.hash, _image.description, msg.value, _author);
  }
}
