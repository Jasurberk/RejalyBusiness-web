import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_BUSINESS_DATA } from '../../../constants';
import Card from '../../../components/common/Card';
import { Icon } from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import type { Business, Review } from '../../../types';
import EditBusinessProfileModal from '../../../components/business/EditBusinessProfileModal';

const BusinessProfile: React.FC = () => {
    const { t } = useTranslation();
    const [business, setBusiness] = useState<Business>(MOCK_BUSINESS_DATA);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [replyingToReviewId, setReplyingToReviewId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleSaveProfile = (updatedBusiness: Business) => {
        setBusiness(updatedBusiness);
        setEditModalOpen(false);
    };

    const handleReplySubmit = (reviewId: string) => {
        const updatedReviews = business.reviews.map(review => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    reply: {
                        text: replyText,
                        date: new Date().toISOString().split('T')[0]
                    }
                };
            }
            return review;
        });
        setBusiness(prev => ({...prev, reviews: updatedReviews}));
        setReplyingToReviewId(null);
        setReplyText('');
    };

    return (
        <>
            <div className="space-y-6">
                {/* Merged Header, About, and Contact Card */}
                <Card>
                    <div className="relative">
                        <div className="h-48 bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${business.coverPhotoUrl})` }}></div>
                        <div className="absolute top-4 right-4">
                            <Button variant="secondary" className="!px-4 !py-2 !text-sm bg-white/80" onClick={() => setEditModalOpen(true)}>
                                <Icon name="edit" className="w-4 h-4 mr-2" />
                                {t('profile.business.editProfile')}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        {/* Header Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{business.name}</h2>
                            <p className="text-slate-500">{t(`home.services.${business.category.toLowerCase().replace(/\s|&/g, '')}`)}</p>
                        </div>
                        
                        <hr/>

                        {/* About Us */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('profile.business.about')}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{business.description}</p>
                        </div>
                        
                        <hr/>
                        
                        {/* Contact & Location */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('profile.business.contactAndLocation')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <dl className="space-y-4">
                                    <div className="flex">
                                        <Icon name="map-pin" className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-slate-500">{t('profile.business.address')}</dt>
                                            <dd className="text-sm text-slate-900">{business.address}</dd>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Icon name="phone" className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-slate-500">{t('profile.business.phone')}</dt>
                                            <dd className="text-sm text-slate-900">{business.phone}</dd>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Icon name="message-square" className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <dt className="text-sm font-medium text-slate-500">{t('profile.business.email')}</dt>
                                            <dd className="text-sm text-slate-900">{business.email}</dd>
                                        </div>
                                    </div>
                                </dl>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 mb-3">{t('profile.business.socialMedia')}</h4>
                                    <div className="flex space-x-4">
                                        {business.socialMedia.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600"><Icon name="instagram" className="w-6 h-6" /></a>}
                                        {business.socialMedia.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600"><Icon name="facebook" className="w-6 h-6" /></a>}
                                        {business.socialMedia.telegram && <a href={business.socialMedia.telegram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600"><Icon name="telegram" className="w-6 h-6" /></a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Merged Team & Working Hours Card */}
                <Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('profile.business.team')}</h3>
                            <div className="flex space-x-6">
                                {business.staff.map(staff => (
                                    <div key={staff.id} className="text-center">
                                        <img className="w-16 h-16 rounded-full mx-auto" src={staff.avatarUrl} alt={staff.name} />
                                        <p className="mt-2 text-sm font-semibold text-slate-800">{staff.name}</p>
                                        <p className="text-xs text-slate-500">{staff.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="p-5 lg:border-l border-t lg:border-t-0">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">{t('profile.business.workingHours')}</h3>
                            <ul className="space-y-1 text-sm text-slate-600">
                                {Object.entries(business.workingHours).map(([day, hours]) => (
                                    <li key={day} className="flex justify-between py-1.5 border-b last:border-b-0">
                                        <span>{day}</span>
                                        <span className="font-medium text-slate-800">{hours}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>
                
                {/* Client Reviews Card */}
                <Card>
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('profile.business.reviews')}</h3>
                        <div className="space-y-6">
                            {business.reviews.map(review => (
                                <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                                    <div className="flex items-start space-x-4">
                                        <img src={review.userAvatarUrl} alt={review.userName} className="w-10 h-10 rounded-full" />
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <p className="font-semibold text-sm text-slate-800">{review.userName}</p>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Icon key={i} name="star" className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600">{review.comment}</p>

                                            {!review.reply && replyingToReviewId !== review.id && (
                                                <div className="text-right mt-2">
                                                    <button onClick={() => setReplyingToReviewId(review.id)} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                                        <Icon name="corner-down-right" className="w-4 h-4 mr-1" />
                                                        {t('profile.business.reply')}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {review.reply && (
                                        <div className="mt-4 ml-14 pl-4 border-l-2 border-slate-200">
                                            <p className="text-sm font-semibold text-slate-700">{business.name} (response)</p>
                                            <p className="text-sm text-slate-600">{review.reply.text}</p>
                                        </div>
                                    )}

                                    {replyingToReviewId === review.id && (
                                        <div className="mt-3 ml-14">
                                            <textarea 
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                rows={3}
                                                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder={t('profile.business.yourReplyPlaceholder')}
                                            />
                                            <div className="flex justify-end space-x-2 mt-2">
                                                <Button variant="secondary" className="!py-1 !px-3 !text-sm" onClick={() => { setReplyingToReviewId(null); setReplyText(''); }}>
                                                    {t('common.cancel')}
                                                </Button>
                                                 <Button className="!py-1 !px-3 !text-sm" onClick={() => handleReplySubmit(review.id)}>
                                                    {t('profile.business.submitReply')}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

            </div>
            {isEditModalOpen && (
                <EditBusinessProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    business={business}
                    onSave={handleSaveProfile}
                />
            )}
        </>
    );
};

export default BusinessProfile;