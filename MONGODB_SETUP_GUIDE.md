# MongoDB Setup Guide for Git Bash

This guide provides step-by-step instructions for setting up MongoDB tools in Git Bash and connecting to the Yashvi Audio MongoDB Atlas cluster.

## Prerequisites

- Windows machine with Git Bash installed
- MongoDB Atlas account with cluster access
- Internet connection

## Table of Contents

1. [Install MongoDB Shell (mongosh)](#install-mongodb-shell-mongosh)
2. [Install MongoDB Database Tools](#install-mongodb-database-tools)
3. [Configure Git Bash Environment](#configure-git-bash-environment)
4. [Connect to MongoDB Atlas](#connect-to-mongodb-atlas)
5. [Import Data](#import-data)
6. [Verify Installation](#verify-installation)
7. [Troubleshooting](#troubleshooting)

## Install MongoDB Shell (mongosh)

### Step 1: Download MongoDB Shell

1. Go to [MongoDB Shell Download](https://www.mongodb.com/try/download/shell)
2. Select **Windows x64 (10+)**
3. Download the ZIP file
4. Extract to a folder (e.g., `C:\mongosh\`)

### Step 2: Add to PATH (Optional)

1. Add `C:\mongosh\bin` to Windows PATH environment variable
2. Restart Git Bash

### Step 3: Test Installation

```bash
mongosh --version
```

Expected output: `mongosh 2.x.x`

## Install MongoDB Database Tools

### Step 1: Download Database Tools

1. Go to [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)
2. Select:
    - **Version**: `100.13.0` (latest stable)
    - **Platform**: `Windows x86_64`
    - **Package**: `tgz` or `zip`
3. Download and extract to `C:\IT_tech\mongodb-database-tools-windows-x86_64-100.13.0\`

### Step 2: Test Installation

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoimport --version
```

Expected output: `mongoimport version: 100.13.0`

## Configure Git Bash Environment

### Method 1: Add to .bashrc (Recommended)

1. **Open .bashrc file**:

    ```bash
    nano ~/.bashrc
    ```

2. **Add MongoDB tools to PATH**:

    ```bash
    # Add this line at the end of the file
    export PATH="$PATH:/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin"
    ```

3. **Save and reload**:
    ```bash
    # Save file (Ctrl+X, then Y, then Enter)
    source ~/.bashrc
    ```

### Method 2: Temporary PATH (Current Session Only)

```bash
export PATH="$PATH:/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin"
```

### Method 3: Use Full Path (No Setup Required)

Always use the full path:

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoimport
```

## Connect to MongoDB Atlas

### Step 1: Get Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster
3. Click **"Connect"**
4. Select **"Connect your application"**
5. Copy the connection string

### Step 2: Connect Using mongosh

```bash
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/"
```

### Step 3: Navigate to Database

```bash
# List all databases
show dbs

# Switch to yashvi-audio database
use yashvi-audio

# List collections
show collections

# Check document count
db['line-array-products'].countDocuments()
```

## Import Data

### Step 1: Prepare JSON File

Ensure your JSON file is in the correct format (array of documents):

```json
[
    {
        "_id": "product-id",
        "name": "Product Name",
        "price": 999.99
        // ... other fields
    }
]
```

### Step 2: Import Data

```bash
# Using full path
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoimport --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yashvi-audio" --collection=line-array-products --file=line-array-products.json --jsonArray

# Or if PATH is configured
mongoimport --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yashvi-audio" --collection=line-array-products --file=line-array-products.json --jsonArray
```

### Step 3: Verify Import

```bash
# Connect to database
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/"

# Switch to database
use yashvi-audio

# Check import success
db['line-array-products'].countDocuments()
```

## Verify Installation

### Test All Tools

```bash
# Test MongoDB Shell
mongosh --version

# Test Database Tools
mongoimport --version
mongoexport --version
mongodump --version
mongorestore --version
```

### Test Connection

```bash
# Connect to Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/"

# Test database access
use yashvi-audio
db['line-array-products'].findOne()
```

## Troubleshooting

### Common Issues

#### 1. Command Not Found

**Problem**: `mongoimport: command not found`
**Solution**: Use full path or add to PATH

```bash
# Use full path
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoimport --version

# Or add to PATH
export PATH="$PATH:/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin"
```

#### 2. Connection Issues

**Problem**: Cannot connect to MongoDB Atlas
**Solutions**:

- Check IP whitelist in Atlas Network Access
- Verify username and password
- Ensure connection string is correct
- Check internet connection

#### 3. Permission Errors

**Problem**: Authentication failed
**Solutions**:

- Verify database user permissions
- Check username/password spelling
- Ensure user has read/write access

#### 4. File Not Found

**Problem**: JSON file not found
**Solutions**:

- Check file path and name
- Ensure you're in the correct directory
- Verify file exists: `ls -la filename.json`

### Git Bash Specific Issues

#### PATH Not Persisting

**Problem**: PATH changes don't persist between sessions
**Solution**: Add to `.bashrc` file:

```bash
nano ~/.bashrc
# Add: export PATH="$PATH:/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin"
source ~/.bashrc
```

#### Windows Path Format

**Problem**: Windows paths not working in Git Bash
**Solution**: Use Git Bash format:

```bash
# Windows: C:\IT_tech\mongodb-tools\bin
# Git Bash: /c/IT_tech/mongodb-tools/bin
```

## Quick Reference Commands

### Connection

```bash
# Connect to Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/"

# Connect to specific database
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yashvi-audio"
```

### Data Operations

```bash
# Import data
mongoimport --uri="connection-string" --collection=collection-name --file=data.json --jsonArray

# Export data
mongoexport --uri="connection-string" --collection=collection-name --out=data.json

# Backup database
mongodump --uri="connection-string" --db=database-name

# Restore database
mongorestore --uri="connection-string" --db=database-name dump/database-name/
```

### Database Queries

```bash
# Switch database
use yashvi-audio

# Count documents
db['collection-name'].countDocuments()

# Find documents
db['collection-name'].find()
db['collection-name'].findOne()

# Find with conditions
db['collection-name'].find({price: {$gt: 1000}})
```

## Team Setup Checklist

- [ ] MongoDB Shell (mongosh) installed and working
- [ ] MongoDB Database Tools installed and working
- [ ] Git Bash PATH configured (optional)
- [ ] Connection to Atlas cluster successful
- [ ] Database access verified
- [ ] Sample data import tested
- [ ] All team members have Atlas access credentials

## MongoDB Operations Guide

### 🔗 Connection String

```
mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/
```

### 📊 Database Operations

#### 1. **Connect to Database**

```bash
mongosh "mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/"
```

#### 2. **Switch to Your Database**

```bash
use yashvi-audio
```

#### 3. **View All Collections**

```bash
show collections
```

#### 4. **Check Document Count**

```bash
db['line-array-products'].countDocuments()
```

### 🔍 Query Operations

#### 1. **View All Products**

```bash
db['line-array-products'].find()
```

#### 2. **View One Product**

```bash
db['line-array-products'].findOne()
```

#### 3. **Find Products by Category**

```bash
db['line-array-products'].find({category: "Line Array Speakers"})
```

#### 4. **Find Products by Price Range**

```bash
db['line-array-products'].find({price: {$gt: 1000}})
```

#### 5. **Find In-Stock Products**

```bash
db['line-array-products'].find({inStock: true})
```

#### 6. **Find Products by Brand**

```bash
db['line-array-products'].find({brand: "TOA"})
```

### 📝 Insert Operations

#### 1. **Add New Product**

```bash
db['line-array-products'].insertOne({
  "_id": "new-product-id",
  "name": "New Product Name",
  "price": 999.99,
  "category": "New Category",
  "inStock": true
})
```

#### 2. **Add Multiple Products**

```bash
db['line-array-products'].insertMany([
  {
    "_id": "product-1",
    "name": "Product 1",
    "price": 500
  },
  {
    "_id": "product-2",
    "name": "Product 2",
    "price": 750
  }
])
```

### ✏️ Update Operations

#### 1. **Update Product Price**

```bash
db['line-array-products'].updateOne(
  {_id: "toa-hx5b"},
  {$set: {price: 1199.99}}
)
```

#### 2. **Update Stock Count**

```bash
db['line-array-products'].updateOne(
  {_id: "toa-hx5b"},
  {$set: {stockCount: 15}}
)
```

#### 3. **Update Multiple Products**

```bash
db['line-array-products'].updateMany(
  {category: "Line Array Speakers"},
  {$set: {category: "Professional Speakers"}}
)
```

### 🗑️ Delete Operations

#### 1. **Delete One Product**

```bash
db['line-array-products'].deleteOne({_id: "product-id"})
```

#### 2. **Delete Multiple Products**

```bash
db['line-array-products'].deleteMany({inStock: false})
```

### 📤 Export Operations

#### 1. **Export All Products**

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoexport --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" --collection=line-array-products --out=exported-products.json
```

#### 2. **Export Specific Products**

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoexport --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" --collection=line-array-products --query='{"category":"Line Array Speakers"}' --out=speakers.json
```

### 📥 Import Operations

#### 1. **Import New Data**

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoimport --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" --collection=line-array-products --file=new-products.json --jsonArray
```

### 🔄 Backup Operations

#### 1. **Backup Database**

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongodump --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" --out=backup
```

#### 2. **Restore Database**

```bash
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongorestore --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" backup/yashvi-audio
```

### 🎯 Advanced Queries

#### 1. **Sort Products by Price**

```bash
db['line-array-products'].find().sort({price: 1})
```

#### 2. **Limit Results**

```bash
db['line-array-products'].find().limit(5)
```

#### 3. **Skip Results**

```bash
db['line-array-products'].find().skip(5).limit(5)
```

#### 4. **Aggregate Operations**

```bash
db['line-array-products'].aggregate([
  {$group: {_id: "$category", count: {$sum: 1}}}
])
```

### 🚀 Quick Start Commands

```bash
# Connect and explore
mongosh "mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/"
use yashvi-audio
db['line-array-products'].find().pretty()

# Export data
/c/IT_tech/mongodb-database-tools-windows-x86_64-100.13.0/bin/mongoexport --uri="mongodb+srv://satish_streamvideo:ueKaARa0t1XKYzd3@satish0.cojqa.mongodb.net/yashvi-audio" --collection=line-array-products --out=products.json
```

## Support

For additional help:

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Shell Documentation](https://docs.mongodb.com/mongodb-shell/)
- [MongoDB Database Tools Documentation](https://docs.mongodb.com/database-tools/)

---

**Last Updated**: January 2025  
**Version**: 1.1  
**Maintained by**: Yashvi Audio Development Team
