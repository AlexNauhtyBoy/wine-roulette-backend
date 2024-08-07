import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { catchError, tap } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class InstagramService {
  private accessToken: string;
  private axiosInstance: AxiosInstance;

  constructor(
  ) {
    this.accessToken = 'IGQWRQb1QwbFBUeUVCRjltNTU2cUtuY05seEVVY2pHajhoN0pGVlIyWktTbmZAKcG5ibHRoX09LQlgxSXlwUEtzVzQ2N016dFhDRFdYYlgyRzh3MGo4NVRHNDBaX2FQNVlndXU2ZAkk4emdzLUs4Wm9uVV9Qb0JuQ2cZD';
    this.axiosInstance = axios.create();
  }

  async processEvent(event: any) {
    if (event.entry) {
        for (const entry of event.entry) {
          if (entry.messaging) {
            for (const message of entry.messaging) {
              if (message.message && message.message.text) {
                console.log('Message is:' + JSON.stringify(message));
                const senderId = message.sender.id;
                const recipientId = message.recipient.id;
                const receivedText = message.message.text;
                console.log('Received text:', receivedText);
  
                const responseText = `You said: ${receivedText}`;
                await this.sendMessage(senderId, responseText, recipientId);
              }
            }
          }
        }
      }
  }

  async sendMessage(recipientId: string, text: string, senderId: string) {
    const url = `https://graph.instagram.com/v20.0/${senderId}/messages`;
    const payload = {
      recipient: { id: recipientId },
      message: { text },
    };
    console.log(url, payload, this.accessToken);
    const headers = {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
        try {
            console.log('Before HTTP request');
const response = await this.axiosInstance.post(url, payload, { headers });
console.log('After HTTP request');
      console.log('Message sent:', response.data);
      return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response) {
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error setting up request:', error.message);
            }
          }
    
  }
}