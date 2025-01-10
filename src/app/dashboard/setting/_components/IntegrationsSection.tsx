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

import whatsapp from '@/images/whatsapp.png';
import facebook from '@/images/facebook.png';
import googleForms from '@/images/googleForms.png';
import googleSheets from '@/images/googleSheets.png';
import { Check } from 'lucide-react';

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
            <Button onClick={generateAPI}>
              {generatedAPIKey ? ' Regenerate API_KEY' : 'Generate API_KEY'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="my-2 flex items-center justify-between">
            Integrations
          </CardTitle>

          <CardDescription>
            Integrations Connect Preline to other tools that you use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card>
              <CardHeader>
                <CardTitle className="my-2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={whatsapp}
                      width={50}
                      height={50}
                      alt="WhatsApp"
                    />
                    <h2 className="text-xl font-semibold tracking-tight transition-colors">
                      What&apos;s App
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-muted space-x-2"
                    type="button"
                  >
                    <Check className="mr-2 text-green-500" /> Connected
                  </Button>
                </CardTitle>
                <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">
                  Copy this API_KEY and use in Pabbly Connect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full gap-5"></div>
              </CardContent>
              <CardFooter className="flex justify-end border-t px-6 py-4">
                <Button>View Integration</Button>
              </CardFooter>
            </Card>{' '}
            <Card>
              <CardHeader>
                <CardTitle className="my-2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={facebook}
                      width={50}
                      height={50}
                      alt="WhatsApp"
                    />
                    <h2 className="text-xl font-semibold tracking-tight transition-colors">
                      What&apos;s App
                    </h2>
                  </div>
                  <Button variant="outline" type="button">
                    Connect
                  </Button>
                </CardTitle>
                <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">
                  Copy this API_KEY and use in Pabbly Connect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full gap-5"></div>
              </CardContent>
              <CardFooter className="flex justify-end border-t px-6 py-4">
                <Button>View Integration</Button>
              </CardFooter>
            </Card>{' '}
            <Card>
              <CardHeader>
                <CardTitle className="my-2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={googleSheets}
                      width={50}
                      height={50}
                      alt="WhatsApp"
                    />
                    <h2 className="text-xl font-semibold tracking-tight transition-colors">
                      What&apos;s App
                    </h2>
                  </div>
                  <Button variant="outline" type="button">
                    Connect
                  </Button>
                </CardTitle>
                <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">
                  Copy this API_KEY and use in Pabbly Connect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full gap-5"></div>
              </CardContent>
              <CardFooter className="flex justify-end border-t px-6 py-4">
                <Button>View Integration</Button>
              </CardFooter>
            </Card>{' '}
            <Card>
              <CardHeader>
                <CardTitle className="my-2 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={googleForms}
                      width={50}
                      height={50}
                      alt="WhatsApp"
                    />
                    <h2 className="text-xl font-semibold tracking-tight transition-colors">
                      What&apos;s App
                    </h2>
                  </div>
                  <Button variant="outline" type="button">
                    Connect
                  </Button>
                </CardTitle>
                <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">
                  Copy this API_KEY and use in Pabbly Connect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full gap-5"></div>
              </CardContent>
              <CardFooter className="flex justify-end border-t px-6 py-4">
                <Button>View Integration</Button>
              </CardFooter>
            </Card>{' '}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default IntegrationsSection;
