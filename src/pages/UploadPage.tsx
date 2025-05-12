import { Client as ContractClient, networks } from '../stellar/src/index';
// import { StellarNetwork, Server, Keypair, TransactionBuilder, Operation } from 'stellar-sdk';
import React, { useState, useRef } from 'react';
import { Upload, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { saveDocument } from '@/firebase/firebase';
import CryptoJS from 'crypto-js';
import { Keypair, TransactionBuilder, Networks, Operation } from 'stellar-sdk';

const generateDocumentHash = (documentContent: string): string => {
  if (!documentContent) {
    throw new Error("Document content is empty");
  }
  const hash = CryptoJS.SHA256(documentContent);
  const base64Hash = CryptoJS.enc.Base64.stringify(hash); // Get the base64 string

  // If the base64 string is too long, trim it to 32 bytes
  return base64Hash.substring(0, 32); // Ensure it doesn't exceed 32 bytes
};




const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check if file is PDF or Word doc
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target?.result;

      if (typeof text !== 'string') {
        toast.error("Failed to read file content");
        return;
      }

      setIsUploading(true);

      try {
        // Step 1: Set up the ContractClient with your contract details
        const client = new ContractClient({
          networkPassphrase: networks.testnet.networkPassphrase,
          contractId: networks.testnet.contractId,
          rpcUrl: 'https://soroban-testnet.stellar.org' // Soroban testnet URL
        });

        // Step 2: Set up the Stellar keypair for signing the transaction
        const secret = import.meta.env.VITE_STELLAR_SECRET_KEY;
        const keypair = Keypair.fromSecret(secret);
        const publicKey = keypair.publicKey();

        // Step 3: Generate the document hash
        const docHash = generateDocumentHash(text);

        // Step 4: Prepare the tokenization transaction
        const tokenizationTransaction = await client.tokenize({
          doc_hash: docHash, // This is the document hash that you generated
          owner: publicKey,  // The public key of the document owner
        });

        console.log('Tokenization Transaction:', tokenizationTransaction);

        // // Step 5: Sign the transaction using the Stellar keypair
        // const signedTransaction = await client.signTransaction({
        //   transaction: tokenizationTransaction,
        //   secretKey: secret,  // Sign the transaction using your secret key
        // });

        // // Step 6: Submit the signed transaction
        // const result = await client.submitTransaction(signedTransaction);
        // console.log('Transaction result:', result);

        // Step 7: Save document data to Firestore
        await saveDocument({
          filename: file.name,
          sizeKB: (file.size / 1024).toFixed(2),
          content: text,
          uploadedAt: new Date().toISOString(),
        });

        // Step 8: Process the progress (simulate the upload progress here)
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setUploadProgress(progress);

          if (progress >= 100) {
            clearInterval(interval);
            toast.success('Document processed and saved!');
            setTimeout(() => {
              navigate('/plan');
            }, 500);
          }
        }, 100);
      } catch (error) {
        console.error("Error during file processing:", error);
        toast.error("Upload failed. Please try again.");
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Error reading the file");
    };

    reader.readAsText(file);
  };


  return (
    <div className="py-12 md:py-16">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="mb-4">Upload Your <span className="gradient-text">Document</span></h1>
          <p className="text-gray-700">
            Upload a document that outlines your skills, values, and passions.
            This will help our AI create a personalized life plan for you.
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-10 text-center ${isDragging ? 'border-ikigai-blue bg-ikigai-blue/5' : 'border-gray-300'
            } transition-all duration-200 mb-6`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-ikigai-blue/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-ikigai-blue" />
            </div>

            <h3 className="text-lg font-medium mb-2">Drag & Drop or Browse Files</h3>
            <p className="text-gray-600 mb-6">
              PDF or Word documents, max 5MB
            </p>

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              ref={fileInputRef}
              onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
            />

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="ikigai-button"
            >
              Browse Files
            </Button>
          </div>
        </div>

        {file && !isUploading && (
          <div className="bg-white rounded-xl border p-4 flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-ikigai-blue/10 flex items-center justify-center mr-3">
                <span className="text-ikigai-blue text-sm font-medium">
                  {file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button
              onClick={handleUpload}
              className="ikigai-button"
            >
              Process Document
            </Button>
          </div>
        )}

        {isUploading && (
          <div className="bg-white rounded-xl border p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Processing document...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Analyzing your document and identifying key elements
            </div>
          </div>
        )}

        <div className="bg-ikigai-bg rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-medium mb-3">Tips For Best Results:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-ikigai-blue/20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-ikigai-blue text-xs font-bold">✓</span>
              </div>
              Include a clear list of your skills and strengths
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-ikigai-blue/20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-ikigai-blue text-xs font-bold">✓</span>
              </div>
              Describe your core values and what matters most to you
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-ikigai-blue/20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-ikigai-blue text-xs font-bold">✓</span>
              </div>
              Outline your passions and what activities bring you joy
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-ikigai-blue/20 flex items-center justify-center mr-2 mt-0.5">
                <span className="text-ikigai-blue text-xs font-bold">✓</span>
              </div>
              Mention any long-term aspirations or dreams you have
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
