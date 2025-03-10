import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { exec } from 'child_process';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const file = files.image;
      if (!file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const imagePath = file.filepath;

      try {
        const pythonScript = `python3 process_image.py ${imagePath}`;
        exec(pythonScript, (error, stdout, stderr) => {
          if (error) {
            console.error(`Exec error: ${error}`);
            return res.status(500).json({ error: 'Error processing image' });
          }

          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
          }

          res.status(200).json({ text: stdout });
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected server error' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
