// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@hyperledger-labs/yui-ibc-solidity/contracts/core/OwnableIBCHandler.sol";
import "solidity-bytes-utils/contracts/BytesLib.sol";
import "../lib/PacketMssg.sol";


contract Alg3B is IIBCModule {
   IBCHandler ibcHandler;
   using BytesLib for *;
   address private owner;

   mapping(string => string) public rcvdnameData;

   constructor(IBCHandler ibcHandler_) public {
        owner = msg.sender;
        ibcHandler = ibcHandler_;

        rcvdnameData["Eli"] = "Blockchain Security";
        rcvdnameData["Markus"] = "Solidity Smart Contract Auditor";
        rcvdnameData["Sophia"] = "AWS Cloud Practitioner";
        rcvdnameData["Jameson Johnson"] = "Web3 Development Professional and Content Creator";
        rcvdnameData["Alex"] = "Full-Stack Blockchain Developer";
        rcvdnameData["A"] = "Z";
     }

   event Gavincall(address indexed to, bytes message);

   event SendTransfer(
        address indexed from,
        address indexed to,
        string sourcePort,
        string sourceChannel,
        uint64 timeoutHeight,
        string message
   );

   modifier onlyOwner() {
        require(msg.sender == owner, "MiniMessage: caller is not the owner");
        _;
    }

   modifier onlyIBC() {
      require(
         msg.sender == address(ibcHandler),
         "MiniMessage: caller is not the ibcHandler"
      );
      _;
    }


    function sendTransfer(
        string memory message,
        address receiver,
        string memory sourcePort,
        string memory sourceChannel,
        uint64 timeoutHeight
    ) public {
        _sendPacket(
            MiniMessagePacketData.Data({
                message: message, 
                sender: abi.encodePacked(msg.sender),
                receiver: abi.encodePacked(receiver)
            }),
            sourcePort,
            sourceChannel,
            timeoutHeight
        );
        emit SendTransfer(
            msg.sender,
            receiver,
            sourcePort,
            sourceChannel,
            timeoutHeight,
            message
        );
    }

   function _gavincall(bytes memory _mssg) internal returns (bool) {
       (address account, bytes memory message_s) = abi.decode(_mssg, (address, bytes));
        string memory data_s = string(message_s);
        string memory data = rcvdnameData[data_s]; 

        if(keccak256(abi.encodePacked(data)) != keccak256(abi.encodePacked(""))){
            sendTransfer(data, account, "transfer", "channel-0", 0);
        }else {
            sendTransfer("FAILED", account, "transfer", "channel-0", 0);
        }
        emit Gavincall(account, message_s);
        
        return true; 
    }
    
    function onRecvPacket(Packet.Data calldata packet, address relayer)
        external
        virtual
        override
        onlyIBC
        returns (bytes memory acknowledgement)
    {
        MiniMessagePacketData.Data memory data = MiniMessagePacketData.decode(
            packet.data
        );
        bytes memory message_s = abi.encode(data.receiver.toAddress(0), data.message); 
        
        //The moment Blockchain B receives data, it calls gavincall
        bool respuesta = _gavincall(message_s);

        return(_newAcknowledgement(respuesta));
    }


    
    function onAcknowledgementPacket(
        Packet.Data calldata packet,
        bytes calldata acknowledgement,
        address relayer
    ) external virtual override onlyIBC {
        
    }



    function _sendPacket(
        MiniMessagePacketData.Data memory data, 
        string memory sourcePort,
        string memory sourceChannel,
        uint64 timeoutHeight
    ) internal virtual {
        (Channel.Data memory channel, bool found) = ibcHandler.getChannel(
            sourcePort,
            sourceChannel
        );
        require(found, "MiniMessage: channel not found");
        ibcHandler.sendPacket(
            Packet.Data({
                sequence: ibcHandler.getNextSequenceSend(
                    sourcePort,
                    sourceChannel
                ),
                source_port: sourcePort,
                source_channel: sourceChannel,
                destination_port: channel.counterparty.port_id,
                destination_channel: channel.counterparty.channel_id,
                data: MiniMessagePacketData.encode(data),
                timeout_height: Height.Data({
                    revision_number: 0,
                    revision_height: timeoutHeight
                }),
                timeout_timestamp: 0
            })
        );
    }

    function _newAcknowledgement(bool success)
        internal
        pure
        virtual
        returns (bytes memory)
    {
        bytes memory acknowledgement = new bytes(1);
        if (success) {
            acknowledgement[0] = 0x01;
        } else {
            acknowledgement[0] = 0x00;
        }
        return acknowledgement;
    }



    function onChanOpenInit(
        Channel.Order,
        string[] calldata connectionHops,
        string calldata portId,
        string calldata channelId,
        ChannelCounterparty.Data calldata counterparty,
        string calldata version
    ) external virtual override {}

    function onChanOpenTry(
        Channel.Order,
        string[] calldata connectionHops,
        string calldata portId,
        string calldata channelId,
        ChannelCounterparty.Data calldata counterparty,
        string calldata version,
        string calldata counterpartyVersion
    ) external virtual override {}

    function onChanOpenAck(
        string calldata portId,
        string calldata channelId,
        string calldata counterpartyVersion
    ) external virtual override {}

    function onChanOpenConfirm(
        string calldata portId,
        string calldata channelId
    ) external virtual override {}

    function onChanCloseConfirm(
        string calldata portId,
        string calldata channelId
    ) external virtual override {}

    function onChanCloseInit(
        string calldata portId,
        string calldata channelId
    ) external virtual override {}
   

}