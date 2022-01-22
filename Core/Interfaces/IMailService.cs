using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeRequest request);

        Task SendVerificationEmailAsync(VerificationRequest request);

    }
}