export interface CSVData {
  [key: string]: string;
}

export async function parseCSV(file: File): Promise<CSVData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => 
          header.trim().toLowerCase()
        );

        const data = lines
          .slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(value => value.trim());
            return headers.reduce((obj: CSVData, header, index) => {
              obj[header] = values[index];
              return obj;
            }, {});
          });

        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse CSV file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

export function validateCSVHeaders(headers: string[], requiredFields: string[]) {
  const missingFields = requiredFields.filter(
    field => !headers.includes(field.toLowerCase())
  );

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields: ${missingFields.join(', ')}`
    );
  }
}

export function generatePassword(length: number = 8): string {
  const charset = 
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
} 