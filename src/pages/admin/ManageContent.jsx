import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea, Tabs } from 'flowbite-react';
import { useAdmin } from '../../context/AdminContext';
import { HiHome, HiPhotograph, HiClipboardList, HiTrash, HiPlus } from 'react-icons/hi';

export default function ManageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [formData, setFormData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (siteContent) {
      setFormData(JSON.parse(JSON.stringify(siteContent))); // Deep copy
    }
  }, [siteContent]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsDirty(true);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.procedure.steps];
    newSteps[index][field] = value;
    setFormData(prev => ({
      ...prev,
      procedure: { ...prev.procedure, steps: newSteps }
    }));
    setIsDirty(true);
  };

  const addStep = () => {
    const newSteps = [...formData.procedure.steps, { title: "New Step", desc: "Description" }];
    setFormData(prev => ({
      ...prev,
      procedure: { ...prev.procedure, steps: newSteps }
    }));
    setIsDirty(true);
  };

  const removeStep = (index) => {
    const newSteps = formData.procedure.steps.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      procedure: { ...prev.procedure, steps: newSteps }
    }));
    setIsDirty(true);
  };

  const handleGalleryChange = (index, value) => {
      const newImages = [...formData.gallery.images];
      newImages[index] = value;
      setFormData(prev => ({
          ...prev,
          gallery: { ...prev.gallery, images: newImages }
      }));
      setIsDirty(true);
  };

  const addImage = () => {
      setFormData(prev => ({
          ...prev,
          gallery: { ...prev.gallery, images: [...prev.gallery.images, ""] }
      }));
      setIsDirty(true);
  };

  const removeImage = (index) => {
      const newImages = formData.gallery.images.filter((_, i) => i !== index);
      setFormData(prev => ({
          ...prev,
          gallery: { ...prev.gallery, images: newImages }
      }));
      setIsDirty(true);
  };

  const handleSave = async () => {
    await updateSiteContent(formData);
    setIsDirty(false);
    alert('Content updated successfully!');
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Page Content Editor</h1>
        <Button color="pink" className="shadow-md border border-pink-600" onClick={handleSave} disabled={!isDirty}>
          {isDirty ? 'Save Changes' : 'Saved'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
          <Tabs aria-label="Content Tabs" variant="underline">
            {/* HOME TAB */}
            <Tabs.Item active title="Home Page" icon={HiHome}>
                <div className="space-y-4 max-w-3xl">
                    <h3 className="text-lg font-bold border-b pb-2">Hero Section</h3>
                    <div>
                        <Label value="Hero Title" />
                        <TextInput value={formData.home.heroTitle} onChange={(e) => handleChange('home', 'heroTitle', e.target.value)} />
                    </div>
                    <div>
                        <Label value="Hero Subtitle" />
                        <TextInput value={formData.home.heroSubtitle} onChange={(e) => handleChange('home', 'heroSubtitle', e.target.value)} />
                    </div>

                    <h3 className="text-lg font-bold border-b pb-2 mt-6">Welcome Section</h3>
                    <div>
                        <Label value="Welcome Title" />
                        <TextInput value={formData.home.welcomeTitle} onChange={(e) => handleChange('home', 'welcomeTitle', e.target.value)} />
                    </div>
                    <div>
                        <Label value="Welcome Text" />
                        <Textarea rows={6} value={formData.home.welcomeText} onChange={(e) => handleChange('home', 'welcomeText', e.target.value)} />
                    </div>
                </div>
            </Tabs.Item>

            {/* PROCEDURE TAB */}
            <Tabs.Item title="Procedure" icon={HiClipboardList}>
                <div className="space-y-6 max-w-3xl">
                    <div>
                        <Label value="Page Title" />
                        <TextInput value={formData.procedure.title} onChange={(e) => handleChange('procedure', 'title', e.target.value)} />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label value="Steps" />
                            <Button size="xs" color="light" className="shadow-sm border border-gray-300" onClick={addStep}><HiPlus className="mr-1"/> Add Step</Button>
                        </div>
                        {formData.procedure.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded border">
                                <span className="font-bold text-gray-400 mt-2">#{idx+1}</span>
                                <div className="flex-grow space-y-2">
                                    <TextInput placeholder="Step Title" value={step.title} onChange={(e) => handleStepChange(idx, 'title', e.target.value)} />
                                    <Textarea placeholder="Step Description" rows={2} value={step.desc} onChange={(e) => handleStepChange(idx, 'desc', e.target.value)} />
                                </div>
                                <Button size="xs" color="failure" className="shadow-sm" onClick={() => removeStep(idx)}><HiTrash /></Button>
                            </div>
                        ))}
                    </div>
                </div>
            </Tabs.Item>

            {/* GALLERY TAB */}
            <Tabs.Item title="Gallery" icon={HiPhotograph}>
                 <div className="space-y-6 max-w-3xl">
                    <div>
                        <Label value="Gallery Title" />
                        <TextInput value={formData.gallery.title} onChange={(e) => handleChange('gallery', 'title', e.target.value)} />
                    </div>
                    <div>
                        <Label value="Gallery Subtitle" />
                        <TextInput value={formData.gallery.subtitle} onChange={(e) => handleChange('gallery', 'subtitle', e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label value="Image URLs (Local path or HTTP URL)" />
                        {formData.gallery.images.map((img, idx) => (
                             <div key={idx} className="flex gap-2">
                                 <TextInput className="flex-grow" value={img} onChange={(e) => handleGalleryChange(idx, e.target.value)} />
                                 <Button size="xs" color="failure" className="shadow-sm" onClick={() => removeImage(idx)}><HiTrash /></Button>
                             </div>
                        ))}
                        <Button size="sm" color="light" onClick={addImage} className="mt-2 shadow-sm border border-gray-300"><HiPlus className="mr-2"/> Add Image URL</Button>
                    </div>
                 </div>
            </Tabs.Item>
          </Tabs>
      </div>
    </div>
  );
}
