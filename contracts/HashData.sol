pragma solidity ^0.4.0;
contract HashData{
	
        string public DataID;
        string public RealData;
		string public HashData;
		string public FileHash;
		uint public blockNumber;
    

	//Add data, hash to Block Chain
	function HashData(string Data_ID,string Real_Data, string Hash_Data, string File_Hash) public {
        //NuclearD[DataID] = NuclearData(DataID,RealData, HashData, FileHash,block.number);
        DataID = Data_ID;
        RealData = Real_Data;
		HashData = Hash_Data;
		FileHash = File_Hash;
		blockNumber = block.number;
        
    }
} 