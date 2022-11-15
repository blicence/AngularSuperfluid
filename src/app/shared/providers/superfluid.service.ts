import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
//import Greeter from '../artifacts/Greeter.json'


import { ProviderErrors } from '../model';
import { DefaultProviderService } from './default-provider.service';
import { WalletProviderService } from './wallet-provider.service';
import { Framework, SuperToken, ConstantFlowAgreementV1, InstantDistributionAgreementV1, Host, Operation } from '@superfluid-finance/sdk-core';
import { environment } from 'src/environments/environment';

@Injectable({
            providedIn: 'root'
})
export class GreeterService {
            sf!: Framework;
            flow!: ConstantFlowAgreementV1;

            greeterContract: any
            operations: Array<Operation> = [];
            constructor(public provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {


            }

            async ngOnInit() {
                        await this.initFramework();
            }

            async initFramework() {
                        this.sf = await Framework.create({
                                    chainId: environment.config.networkParams.chainIdNumber,
                                    provider: this.provider.provider,
                                    customSubgraphQueriesEndpoint: "",// todo add subgraf
                                    resolverAddress: ""
                        });
                        this.flow = this.sf.cfaV1;

            }
            async createStream(sender: string, flowRate: string, receiver: string, superToken: string, data: string
            ) {
                        if (this.sf == undefined) {
                                    await this.initFramework();
                        }
                        const createFlowOperation = this.flow.createFlow({
                                    sender: sender,
                                    flowRate: flowRate,
                                    receiver: receiver,
                                    superToken: superToken,
                                    userData: data

                        });

                        this.operations.push(createFlowOperation);
            }
            async startStream(sender: string, flowRate: string, receiver: string, superToken: string, data: string) {
                        if (this.sf == undefined) {
                                    await this.initFramework();
                        }

                        let createFlowOperation = this.sf.cfaV1.createFlow({
                                    sender: sender,
                                    flowRate: flowRate,
                                    receiver: receiver,
                                    superToken: superToken,
                                    userData: data
                        });
                        await createFlowOperation.exec(this.wallet.signer);

            }
            async stopStream(sender: string, flowRate: string, receiver: string, superToken: string, data: string) {
                        if (this.sf == undefined) {
                                    await this.initFramework();
                        }

                        let deleteFlowOperation = this.sf.cfaV1.deleteFlow({
                                    sender: sender,
                                    flowRate: flowRate,
                                    receiver: receiver,
                                    superToken: superToken,
                                    userData: data
                        });
                        const result = await (await deleteFlowOperation.exec(this.wallet.signer)).wait();

            }



            async greet() {
                        let greet = await this.greeterContract.greet();
                        return greet;
            }
            async setGreeting(greeting: string) {
                        let greet = this.greeterContract.connect(this.wallet.signer).setGreeting(greeting)
                                    .then(() => { })
                                    .catch((err) => {
                                                if (err.code == 4001) {

                                                            console.error("error", ProviderErrors[err.code].title);
                                                }
                                    });


                        return greet;
            }
}
