import {EventRegister} from 'react-native-event-listeners';
import AddBankDto from '../../screens/app/more/bankAccount/dto/add.bank.dto';
import GetBankResponse from '../../screens/app/more/bankAccount/dto/get.bank.dto';
import ResolveBankDto from '../../screens/app/more/bankAccount/dto/reslove-bank.dto';
import AnalyticsDto from '../../screens/app/more/dto/Analytics.dto';
import DisputesDto from '../../screens/app/more/dto/Disputes.dto';
import FeedbackDto from '../../screens/app/more/dto/FeedBack.dto';
import FundWalletDto from '../../screens/app/more/dto/FundWallet.dto';
import TransactionDto from '../../screens/app/more/dto/Transaction.dto';
import WalletDto from '../../screens/app/more/dto/Wallet.dto';
import {LoginResponse} from '../../screens/auth/dto/LoginDto';
import AppStorage from '../AppStorage';
import {EVENTS, UserTypes} from '../Constant';
import Endpoints from './Endpoints';
import Http from './Http';

export default class MoreApi extends Http {
  protected async switchUser(userType: UserTypes) {
    const res = await this.fetchHandler({
      path: Endpoints.switchUser(),
      method: 'PATCH',
      body: {userType},
    });
    const data = await this.handleResponse<LoginResponse>(res);

    const currentUser = AppStorage.find('userType') as UserTypes;

    AppStorage.save('access_token', data?.data.accessToken!);

    if (currentUser === UserTypes.CUSTOMER) {
      EventRegister.emit(EVENTS.SWITCH_USER, {
        userType: UserTypes.PROVIDER,
        isVerified: data?.data.user?.identityVerified,
      });
    } else {
      EventRegister.emit(EVENTS.SWITCH_USER, {
        userType: UserTypes.CUSTOMER,
        isVerified: data?.data.user?.identityVerified,
      });
    }

    return data;
  }

  protected async disputes(query: PaginationQuery<{status: string}>) {
    const res = await this.fetchHandler({
      path: Endpoints.disputes(query),
      method: 'GET',
    });
    const data = await this.handleResponse<
      {disputes: DisputesDto[]; totalDisputes: number},
      true
    >(res);

    return data;
  }

  protected async wallet() {
    const res = await this.fetchHandler({
      path: Endpoints.wallet(),
      method: 'GET',
    });
    const data = await this.handleResponse<WalletDto>(res);

    return data;
  }

  protected async analytics() {
    const res = await this.fetchHandler({
      path: Endpoints.analytics(),
      method: 'GET',
    });
    const data = await this.handleResponse<AnalyticsDto>(res);

    return data;
  }

  protected async initializePayment(body: FundWalletDto) {
    const res = await this.fetchHandler({
      path: Endpoints.initializePayment(),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<{
      authorizationUrl: string;
      accessCode: string;
      reference: string;
    }>(res);

    return data;
  }

  protected async withdraw(body: Partial<FundWalletDto>) {
    const res = await this.fetchHandler({
      path: Endpoints.withdraw(),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async feedback(body: FeedbackDto) {
    const res = await this.fetchHandler({
      path: Endpoints.feedback(),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async walletTransactions(query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.walletTransactions(query),
      method: 'GET',
    });
    const data = await this.handleResponse<TransactionDto[], true>(res);

    return data;
  }

  protected async listBanks() {
    const res = await this.fetchHandler({
      path: Endpoints.listBanks,
      method: 'GET',
    });
    const data = await this.handleResponse<{code: string; name: string}[]>(res);

    return data;
  }

  protected async addBankAccount(body: AddBankDto) {
    const res = await this.fetchHandler({
      path: Endpoints.addBankAccount(),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getBankAccount() {
    const res = await this.fetchHandler({
      path: Endpoints.getBankAccount(),
      method: 'GET',
    });
    const data = await this.handleResponse<GetBankResponse[]>(res);

    return data;
  }

  protected async resolveBankAccount(body: ResolveBankDto) {
    const res = await this.fetchHandler({
      path: Endpoints.resolveBankAccount(),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<{data: {account_name: string}}>(res);

    return data;
  }
}
