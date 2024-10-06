'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';

import whatsapp from '../../../../../public/whatsapp.png';
import facebook from '../../../../../public/facebook.png';
import googleForms from '../../../../../public/googleForms.png';
import googleSheets from '../../../../../public/googleSheets.png';

const IntegrationsSection = () => {
  const [generatedAPIKey, setGeneratedAPIKey] = useState(null);

  const generateAPI = () => {
    const crypto = require('crypto');
    const newAPIKey = crypto.randomBytes(18).toString('hex');
    setGeneratedAPIKey(newAPIKey);
    toast.success(`API key: ${newAPIKey}`);
    console.log(`API key ${newAPIKey} generated successfully`);
  };

  const copyToClipboard = () => {
    if (generatedAPIKey) {
      navigator.clipboard.writeText(generatedAPIKey).then(
        () => {
          toast.success('API key copied to clipboard!');
        },
        () => {
          toast.error('Failed to copy API key!');
        }
      );
    }
  };

  return (
    <>
      <div className="grid gap-5 mb-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex">Secret API key</CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5">
              <div className="flex w-[40%] items-center justify-start rounded-lg border border-dashed px-5 dark:border-white">
                <input
                  type="text"
                  value={generatedAPIKey || ''}
                  readOnly
                  placeholder="Click on generate"
                  className="w-full focus:border-none focus:outline-none"
                />
              </div>
              <Button disabled={!generatedAPIKey} onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex border-t px-6 py-4">
            <Button onClick={generateAPI}>Generate API_KEY</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="gird grid-rows-2 gap-10 space-y-5">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="my-2 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image src={whatsapp} width={50} height={50} alt="WhatsApp" />
                <div>WhatsApp API</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5"></div>
          </CardContent>
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="my-2 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image src={facebook} width={50} height={50} alt="WhatsApp" />
                <div>FaceBook Lead's</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5"></div>
          </CardContent>
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="my-2 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image
                  src={googleForms}
                  width={50}
                  height={50}
                  alt="googleForms"
                />
                <div>Google Forms API</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-5"></div>
          </CardContent>
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="my-2 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image
                  src={googleSheets}
                  width={50}
                  height={50}
                  alt="Google Sheets"
                />
                <div>Google Sheets API</div>
              </div>
              <Button variant="outline" type="button">
                Connect
              </Button>
            </CardTitle>
            <CardDescription>
              Copy this API_KEY and use in Pabbly Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-5"></div>
          </CardContent>
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button>View Integration</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default IntegrationsSection;
